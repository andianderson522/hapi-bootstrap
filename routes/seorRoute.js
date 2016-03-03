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
  if (context.KWFirstPara) {
    total += 20;
  }
  if (context.KWinURL) {
    total += 5;
  }
  if (context.MDPresent) {
    total += 2;
  }
  if (context.numCharsInMD) {
    total += 1;
  }
  if (context.KWinMD) {
    total += 2;
  }
  if (context.numWordsInStory) {
    total += 10;
  }
  if (context.presenceOfImage) {
    total += 10;
  }
  if (context.internalLinksNum) {
    total += 5;
  }
  return total;
}

function headLineCheck(headline, context, focusKW, seoTitle) {
  return new Promise(function r(resolve) {
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
    if (headline === seoTitle) {
      context.gnTitlesMatch = true;
    }
    return resolve(context);
  });
}

function checkBody(body, focusKW, context) {
  return new Promise(function r(resolve) {
    let ind = body.indexOf('|||');
    let firstPara = body.substring(0, ind - 1);
    if (firstPara.toLowerCase().indexOf(focusKW.toLowerCase()) >= 0) {
      context.KWFirstPara = true;
    }
    let totWordCnt = body.split(' ').length;
    if (totWordCnt > 300) {
      context.numWordsInStory = true;
    }
    if (totWordCnt > 200) {
      context.gnMinWords = true;
    }
    if (totWordCnt < 3000) {
      context.gnMaxWords = true;
    }
    if (body.indexOf('[#image:') >= 0) {
      context.presenceOfImage = true;
    }
    let firstEmbed = body.indexOf('[#');
    let linkCount = 0;
    let currentIndex = firstEmbed;
    if (firstEmbed < 0) {
      firstEmbed = body.length;
    } else {
      while (currentIndex < body.length && currentIndex > -1) {
        let s1 = body.substring(currentIndex);
        currentIndex = body.indexOf('[#', currentIndex + 2);
        if (s1.startsWith('[#image')) {
          continue;
        } else {
          linkCount++;
        }
        if (linkCount > 3) {
          break;
        }
      }
      if (linkCount >= 3) {
        context.internalLinksNum = true;
      }
    }
    let bodyToEmbed = body.substring(0, firstEmbed - 1);
    if (bodyToEmbed.split(' ').length > 200) {
      context.gnMinWordsB4Embed = true;
    }
    return resolve(context);
  });
}

function checkURL(url, focusKW, context) {
  return new Promise(function r(resolve) {
    let conv = focusKW.split(' ').join('-');
    if (url.toLowerCase().indexOf(conv.toLowerCase()) >= 0) {
      context.KWinURL = true;
    }
    return resolve(context);
  });
}

function checkMetaDesc(metaDesc, focusKW, context) {
  return new Promise(function r(resolve) {
    if (metaDesc.length > 0) {
      context.MDPresent = true;
      if (metaDesc.length <= 80) {
        context.numCharsInMD = true;
      }
      if (metaDesc.toLowerCase().indexOf(focusKW.toLowerCase()) >= 0) {
        context.KWinMD = true;
      }
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
      // let contentID = req.params.id;
      var context = {
        KWinHL: false,
        KWinHLearly: false,
        KWFirstPara: false,
        KWinURL: false,
        MDPresent: false,
        numCharsInMD: false,
        KWinMD: false,
        numWordsInStory: false,
        presenceOfImage: false,
        KWinCaption: false,
        internalLinksNum: false,
        gnPass: false,
        gnMinWords: false,
        gnMinWordsB4Embed: false,
        gnHeadlineWordCnt: false,
        gnMaxWords: false,
        gnTitlesMatch: false
      };
      let headline = payload.hed;
      let focusKW = payload.seoKeywords;
      let body = payload.body;
      let url = payload.url;
      let metaDesc = payload.seoDescription;
      let seoTitle = payload.seoTitle;
      /*
      Red:  Below 60%  Orange: 60%   Green: 90%
1.  Focus keyword/s.  (must have, tool should not even work without this inputted)
Keyword in the headline   35%
Keyword early in the headline 5%
Keyword in the first paragraph 20%
Keyword in the URL 5%
Meta description 2%
Number of chars of meta description 80 max  1%
Focus keyword in the meta description 2%
Number of words in the story (300 words minimum) 10%
Presence of image 10%
11.  Keywords in the caption 5%
3 internal links 5%

Google News:  Pass or fail for each
200 words minimum  
200 Words before first embed
4 -12 Words in the Headline
3000 words maximum
Headline is identical to the Page Title
[#image: https://www.youtube.com/watch?v=kpG-fUv9vZs]|||
      */
      return Promise.all([context, headLineCheck(headline, context, focusKW, seoTitle), checkBody(body, focusKW, context), checkURL(url, focusKW, context), checkMetaDesc(metaDesc, focusKW, context)])
      .then(function a(result) {
        return result[0];
      })
      .then(function rep() {
        reply({
          totalScore: score(context),
          KWinHL: context.KWinHL,
          KWinHLearly: context.KWinHLearly,
          KWFirstPara: context.KWFirstPara,
          KWinURL: context.KWinURL,
          MDPresent: context.MDPresent,
          numCharsInMD: context.numCharsInMD,
          KWinMD: context.KWinMD,
          numWordsInStory: context.numWordsInStory,
          presenceOfImage: context.presenceOfImage,
          KWinCaption: context.KWinCaption,
          internalLinksNum: context.internalLinksNum,
          gnPass: context.gnMinWords && context.gnMinWordsB4Embed && context.gnHeadlineWordCnt && context.gnMaxWords && context.gnTitlesMatch,
          gnMinWords: context.gnMinWords,
          gnMinWordsB4Embed: context.gnMinWordsB4Embed,
          gnHeadlineWordCnt: context.gnHeadlineWordCnt,
          gnMaxWords: context.gnMaxWords,
          gnTitlesMatch: context.gnTitlesMatch
        });
        return Promise.resolve;
      });
    },
    config: {
      description: 'Returns if app is running or not.',
      notes: 'This endpoint is used for monitoring the app.',
      tags: ['api', 'monitoring'],
      cache: {
        expiresIn: 5 * 1000
      }
    }
  });
};
