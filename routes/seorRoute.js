'use strict';

module.exports = function attachPingRoutes(server) {
  server.route({
    method: 'GET',
    path: '/seor/top',
    handler: function (req, reply) {
      console.log(req + reply);
      let response = [{
        contentID: 10,
        headline: 'Caitlyn Jenner: The Full Story',
        seorScore: 85,
        googleNews: true,
        googleRank: 5,
        focusKeyword: 'bruce jenner',
        sampleDate: '02/29/2016'
      }, {
        contentID: 1,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 2,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 3,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 4,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 5,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 6,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 7,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      },
      {contentID: 8,
        headline: 'an article',
        seorScore: 97,
        googleNews: true,
        googleRank: 13,
        focusKeyword: 'car',
        sampleDate: '02/29/2016'
      }, {
        contentID: req.params.id,
        headline: 'Justin Rose: How to Control Your Wedges',
        seorScore: 45,
        googleNews: true,
        googleRank: 22,
        focusKeyword: 'justin rose',
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
