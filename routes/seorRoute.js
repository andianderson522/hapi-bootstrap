'use strict';

module.exports = function attachPingRoutes(server) {
  server.route({
    method: 'GET',
    path: '/seor/top',
    handler: function (req, reply) {
      console.log(req + reply);
      let response = [
        {
          contentID: 4,
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
          type: 'ARTICLE',
          headline: 'Why Tiger Woods could return to Riviera, the place where he\'s had the least success on tour',
          seorScore: 98,
          googleNews: true,
          googleRank: 3,
          focusKeyword: 'car',
          sampleDate: '02/29/2016'
        }, {
          contentID: 10,
          type: 'ARTICLE',
          headline: 'Caitlyn Jenner: The Full Story',
          seorScore: 97,
          googleNews: true,
          googleRank: 5,
          focusKeyword: 'bruce jenner',
          sampleDate: '02/29/2016'
        }, {
          contentID: 2,
          type: 'GALLERY',
          headline: 'PHOTOS: KATE UPTON\'S GQ COVER SHOOT',
          seorScore: 92,
          googleNews: false,
          googleRank: 6,
          focusKeyword: 'kate upton',
          sampleDate: '02/29/2016'
        }, {
          contentID: 6,
          type: 'ARTICLE',
          headline: 'an article',
          seorScore: 65,
          googleNews: true,
          googleRank: 6,
          focusKeyword: 'spirit airlines baggage fees',
          sampleDate: '02/29/2016'
        }, {
          contentID: 5,
          type: 'ARTICLE',
          headline: 'How to Beat Spirit at its Own Game and Minimize Airline Fees',
          seorScore: 52,
          googleNews: true,
          googleRank: 13,
          focusKeyword: 'car',
          sampleDate: '02/29/2016'
        }, {
          contentID: 7,
          type: 'HOTEL',
          headline: 'The Royal Hawaiian (Luxury Collection)',
          seorScore: 49,
          googleNews: true,
          googleRank: 14,
          focusKeyword: 'royal hawaiian hotel',
          sampleDate: '02/29/2016'
        }, {
          contentID: 9,
          type: 'ARTICLE',
          headline: 'Justin Rose: How to Control Your Wedges',
          seorScore: 35,
          googleNews: true,
          googleRank: 22,
          focusKeyword: 'justin rose',
          sampleDate: '02/29/2016'
        }, {
          contentID: 1,
          type: 'GALLERY',
          headline: '30 White Kitchen Design Ideas',
          seorScore: 32,
          googleNews: false,
          googleRank: 27,
          focusKeyword: 'car',
          sampleDate: '02/29/2016'
        }, {
          contentID: 11,
          type: 'NEWSLETTER',
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
    handler: function (req, reply) {
      console.log(req + reply);
      reply({
        contentID: req.params.id,
        type: 'ARTICLE',
        headline: 'Justin Rose: How to Control Your Wedges',
        seorScore: 45,
        googleNews: true,
        googleRank: 22,
        focusKeyword: 'justin rose',
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
};
