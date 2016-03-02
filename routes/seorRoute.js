'use strict';
var Promise = require('bluebird');

function score(context) {
  let total = 0;
  if (context.KWinHL) {
    total += 35;
  }
  if (context.KWinHLearly) {
    total += 5;
  }
  return total;
}

function headLineCheck(headline, context, focusKW) {
  return new Promise(function (resolve, reject) {
    let ind = headline.toLowerCase().indexOf(focusKW.toLowerCase());
    let len = headline.length;
    if (ind >= 0) {
      context.KWinHL = true;
      if (ind < len) {
        context.KWinHLearly = true;
      }
    }
    let sp = headline.split(' ');
    if (sp.length > 4 && sp.length < 12) {
      context.gnHeadlineWordCnt = true;
    }
    return resolve(context);
  });
}

module.exports = function attachPingRoutes(server) {
  server.route({
    method: 'GET',
    path: '/seor/top',
    handler: function hand(req, reply) {
      let response = [
        {
          contentID: 4,
          brand: 'EPI',
          type: 'RECIPE',
          headline: 'HUMMUS',
          seorScore: 99,
          googleNews: false,
          googleRank: 1,
          focusKeyword: 'hummus recipe',
          sampleDate: '02/29/2016'
        },
        {
          contentID: 3,
          brand: 'GLF',
          type: 'ARTICLE',
          headline: 'Why Tiger Woods could return to Riviera, the place where he\'s had the least success on tour',
          seorScore: 97,
          googleNews: true,
          googleRank: 3,
          focusKeyword: 'tiger woods',
          sampleDate: '02/29/2016'
        }, {
          contentID: 10,
          brand: 'VF',
          type: 'ARTICLE',
          headline: 'Caitlyn Jenner: The Full Story',
          seorScore: 95,
          googleNews: true,
          googleRank: 5,
          focusKeyword: 'bruce jenner',
          sampleDate: '02/29/2016'
        }, {
          contentID: 2,
          brand: 'GQ',
          type: 'GALLERY',
          headline: 'PHOTOS: KATE UPTON\'S GQ COVER SHOOT',
          seorScore: 92,
          googleNews: false,
          googleRank: 6,
          focusKeyword: 'kate upton',
          sampleDate: '02/29/2016'
        }, {
          contentID: 6,
          brand: 'TVL',
          type: 'ARTICLE',
          headline: 'How to Beat Spirit at its Own Game and Minimize Airline Fees',
          seorScore: 65,
          googleNews: true,
          googleRank: 6,
          focusKeyword: 'spirit airlines baggage fees',
          sampleDate: '02/29/2016'
        }, {
          contentID: 7,
          type: 'HOTEL',
          brand: 'TVL',
          headline: 'The Royal Hawaiian (Luxury Collection)',
          seorScore: 49,
          googleNews: false,
          googleRank: 14,
          focusKeyword: 'royal hawaiian hotel',
          sampleDate: '02/29/2016'
        }, {
          contentID: 9,
          brand: 'TNV',
          type: 'ARTICLE',
          headline: 'Justin Rose: How to Control Your Wedges',
          seorScore: 35,
          googleNews: false,
          googleRank: 22,
          focusKeyword: 'justin rose',
          sampleDate: '02/29/2016'
        }, {
          contentID: 1,
          type: 'GALLERY',
          brand: 'AD',
          headline: '30 White Kitchen Design Ideas',
          seorScore: 32,
          googleNews: false,
          googleRank: 27,
          focusKeyword: 'car',
          sampleDate: '02/29/2016'
        }, {
          contentID: 5,
          type: 'ARTICLE',
          brand: 'BA',
          headline: 'How to Buy, Store, and Cook Butternut Squash, in Season in Autumn',
          seorScore: 22,
          googleNews: false,
          googleRank: 31,
          focusKeyword: 'butternut squash recipes',
          sampleDate: '02/29/2016'
        }, {
          contentID: 12,
          type: 'ARTICLE',
          brand: 'GQ',
          headline: 'Baseball Player\s Laugh Sounds Like a Cackling Demon',
          seorScore: 20,
          googleNews: true,
          googleRank: 43,
          focusKeyword: 'brett phillips',
          sampleDate: '02/29/2016'
        }, {
          contentID: 11,
          type: 'NEWSLETTER',
          brand: 'VOG',
          headline: 'How Style are you?',
          seorScore: 'N/A',
          googleNews: false,
          googleRank: -1,
          focusKeyword: 'N/A',
          sampleDate: '02/29/2016'
        }];
      reply(response);
    },
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 300 * 1000
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/seor/{id}',
    handler: function hand(req, reply) {
      reply({
        contentID: req.params.id,
        type: 'ARTICLE',
        brand: 'GQ',
        headline: 'Baseball Player\s Laugh Sounds Like a Cackling Demon',
        seorScore: 20,
        googleNews: true,
        googleRank: 43,
        focusKeyword: 'brett phillips',
        sampleDate: '02/29/2016'
      });
    },
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 300 * 1000
      }
    }
  });
  server.route({
    method: 'POST',
    path: '/seor/score/{id}',
    handler: function hand(req, reply) {
      let payload = req.payload;
      console.log(payload);
      let contentID = req.params.id;
      var context = {
        KWinHL: false,
        KWinHLearly: false,
        KWFirstPara: false,
        KWinURL: false,
        MDPresent: false,
        numWordsInMD: false,
        KWinMD: false,
        numWordsInStory: false,
        presenceOfImage: false,
        KWinCaption: false,
        internalLinksNum: false,
        gnPass: false,
        gnMinWords: false,
        gnMinWordsB4Embed: false,
        gnHeadlineWordCnt: false,
        gnMaxWords: false
      };
      let headline = payload.headline;
      let focusKW = payload.focusKW;
      /*
      Red:  Below 60%  Orange: 60%   Green: 90%
1.  Focus keyword/s.  (must have, tool should not even work without this inputted)
2.  Keyword in the headline   35%
3.  Keyword early in the headline 5%
4.  Keyword in the first paragraph 20%
5.  Keyword in the URL 5%
6.  Meta description 2%
7.  Number of words of meta description   1%
8.  Focus keyword in the meta description 2%
9.  Number of words in the story (300 words minimum) 10%
10.  Presence of image 10%
11.  Keywords in the caption 5%
12.  3 internal links 5%

Google News:  Pass or fail for each
13.  200 words minimum  
14.  200 Words before first embed
15.  4 -12 Words in the Headline
16.  3000 words maximum
      */
      return Promise.all([context, headLineCheck(headline, context, focusKW)])
      .then(function a(result) {
        return result[0];
      })
      .then(function rep() {
        console.log('context:');
        console.dir(context);
        console.log(context.KWinHL);
        reply({
          KWinHL: context.KWinHL || false,
          KWinHLearly: context.KWinHLearly,
          KWFirstPara: true,
          KWinURL: true,
          MDPresent: true,
          numWordsInMD: true,
          KWinMD: true,
          numWordsInStory: true,
          presenceOfImage: true,
          KWinCaption: true,
          internalLinksNum: true,
          gnPass: context.gnMinWords && context.gnMinWordsB4Embed && context.gnHeadlineWordCnt && context.gnMaxWords,
          gnMinWords: false,
          gnMinWordsB4Embed: false,
          gnHeadlineWordCnt: context.gnHeadlineWordCnt,
          gnMaxWords: false,
          totalScore: score(context)
        });
        return Promise.resolve;
      });
    },
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 300 * 1000
      }
    }
  });
};
