import fetch from 'node-fetch';
import cheerio from 'cheerio';
import MongoClient from 'mongodb';
import { getMongoConnection } from './mongoConnection.js';

async function fetchNewsPageCount() {
  console.log('Fetching news page count from fishwatch.gov.');
  const url =
    'https://www.fisheries.noaa.gov/news-and-announcements/news?title=&field_news_category_value[feature_story]=feature_story&field_topics_vocab_target_id[2]=2&field_topics_vocab_target_id[1000000041]=1000000041&field_topics_vocab_target_id[1000000065]=1000000065&field_topics_vocab_target_id[1000044526]=1000044526&field_topics_vocab_target_id[31]=31&field_species_vocab_target_id=&sort_by=created&page=0';
  const response = await fetch(url);
  const responseHtml = await response.text();

  const $ = cheerio.load(responseHtml);

  // Grab number of news items.
  const newsItemsCount = $('.result-count__message').find('strong').text();

  // Divide number of news items by 10 which is the amount of items per page.
  let pageCount = Math.floor(newsItemsCount / 10);

  // Determine if there are any remainders.
  const newsItemsCountRemainder = newsItemsCount % 10;

  // If there are remainders add additional page.
  if (newsItemsCountRemainder > 0) {
    pageCount = pageCount + 1;
  }

  // Return page count.
  return pageCount;
}

async function fetchNewsData() {
  let newsPageCount = await fetchNewsPageCount();
  let newsObjectArray = [];

  for (let i = 0; i < newsPageCount; i++) {
    console.log('Fetching news items from each news page.');
    const url = `https://www.fisheries.noaa.gov/news-and-announcements/news?title=&field_news_category_value[feature_story]=feature_story&field_topics_vocab_target_id[2]=2&field_topics_vocab_target_id[1000000041]=1000000041&field_topics_vocab_target_id[1000000065]=1000000065&field_topics_vocab_target_id[1000044526]=1000044526&field_topics_vocab_target_id[31]=31&field_species_vocab_target_id=&sort_by=created&page=${i}`;
    const response = await fetch(url);
    const responseHtml = await response.text();

    const $ = cheerio.load(responseHtml);

    const newsItems = $('.vertical-list__item');

    newsItems.each(function () {
      const newsItemTitle = $(this).find('.teaser__title').text().trim();
      const newsItemCaption = $(this).find('.teaser__summary').text().trim();
      const newsItemURL = $(this).find('.teaser__title-link').attr('href');
      const newsItemDate = $(this).find('.teaser__meta-date').text();
      const newsItemFormattedDate = new Date(newsItemDate);
      let newsItemImageURL = $(this)
        .find('.teaser__image-link')
        .find('img')
        .attr('src');
      const newsItemBaseURL = 'https://www.fisheries.noaa.gov';

      if (newsItemImageURL) {
        newsItemImageURL = newsItemImageURL.replace(
          'media_375_x_250',
          'original'
        );
      }

      // Build news item object.
      const newsItemObject = {
        title: newsItemTitle,
        caption: newsItemCaption,
        date: newsItemFormattedDate,
        url: newsItemBaseURL + newsItemURL,
        imageUrl: newsItemImageURL,
      };

      newsObjectArray.push(newsItemObject);
    });
  }
  return newsObjectArray;
}

export default async function updateNewsTable() {
  const newsData = await fetchNewsData();
  const db = getMongoConnection();

  // Drop news collection in order to reseed with fresh data.
  if ((await db.collection('news').find().count()) > 0) {
    console.log('Dropping news collection.');
    db.collection('news').drop();
  }

  // Take newsData array and insert individual news objects into mongoDB as documents.
  newsData.map((newsItem) => {
    console.log('Reseeding news collection.');
    db.collection('news').insertOne(newsItem);
  });
  console.log('Update news table cron job complete.');
}

// Base URL (Home news page)
// https://www.fisheries.noaa.gov/news-and-announcements/news?title=&field_news_category_value[feature_story]=feature_story&sort_by=created&page=0

// News URL with specific categories selected.
// Subjects:
// - Aquaculture
// - Commerical Fishing
// - Seafood Commerce & Trade
// - Sustainable Fisheries
// - Sustainable Seafood
// https://www.fisheries.noaa.gov/news-and-announcements/news?title=&field_news_category_value[feature_story]=feature_story&field_topics_vocab_target_id[2]=2&field_topics_vocab_target_id[1000000041]=1000000041&field_topics_vocab_target_id[1000000065]=1000000065&field_topics_vocab_target_id[1000044526]=1000044526&field_topics_vocab_target_id[31]=31&field_species_vocab_target_id=&sort_by=created&page=0
