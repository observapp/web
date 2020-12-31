const pageDataReader = (data, pageTitle, sectionTitle, mediaType) => {
  if (data && Array.isArray(data)) {
    if (!pageTitle) {
      return data;
    }
    let pageData = data.filter((elem) => elem.title === pageTitle);
    if (
      pageData.length > 0 &&
      pageData[0].sections &&
      Array.isArray(pageData[0].sections)
    ) {
      if (!sectionTitle) {
        return pageData;
      }
      let sections = pageData[0].sections.filter(
        (section_) => section_.title === sectionTitle
      );
      if (sections.length > 0) {
        if (sections[0].contents) {
          if (!mediaType) {
            return sections[0].contents.sort((a, b) => a.order - b.order);
          }
          return sections[0].contents
            .sort((a, b) => a.order - b.order)
            .filter((content) => content.type === mediaType);
        }
      }
    }
  }
  return [];
};

pageDataReader.TP_AUDIO = "audio";
pageDataReader.TP_SERIES = "series";
pageDataReader.PG_EXPLORER = "Explorer";
pageDataReader.PG_MEDITATE = "Meditate";
pageDataReader.SN_RECCOS = "Our Recommendations";
pageDataReader.SN_INTRO = "Intro";
pageDataReader.SN_GUIDEDMEDITATIONS = "Guided Meditations";
pageDataReader.SN_FOCUSMUSIC = "Focus Music";

const pageDataUpdater = (data, pageTitle, sectionTitle, contents) => {
  if (!data) {
    data = [
      {
        title: pageTitle,
        sections: [
          {
            title: sectionTitle,
            contents: contents,
          },
        ],
      },
    ];
    return data;
  }
  if (pageDataReader(data, pageTitle).length == 0) {
    let pgIndex = data.findIndex((page) => page.title === pageTitle);
    if (pgIndex == -1) {
      data.push({
        title: pageTitle,
        sections: [
          {
            title: sectionTitle,
            contents: contents,
          },
        ],
      });
    } else if (!data[pgIndex]["sections"]) {
      data[pgIndex]["sections"] = [
        {
          title: sectionTitle,
          contents: contents,
        },
      ];
    }

    return data;
  }
  if (pageDataReader(data, pageTitle, sectionTitle).length == 0) {
    let pgIndex = data.findIndex((page) => page.title === pageTitle);
    let secIndex = data[pgIndex]["sections"].findIndex(
      (section) => section.title === sectionTitle
    );
    if (secIndex == -1) {
      data[pgIndex]["sections"].push({
        title: sectionTitle,
        contents: contents,
      });
    } else {
      data[pgIndex]["sections"][secIndex].contents = contents;
    }

    return data;
  } else {
    let pgIndex = data.findIndex((page) => page.title === pageTitle);
    let secIndex = data[pgIndex]["sections"].findIndex(
      (section) => section.title === sectionTitle
    );
    data[pgIndex]["sections"][secIndex].contents = contents;
    return data;
  }
};

export { pageDataReader, pageDataUpdater };

/*******************************************************
 * TEST CODE FOR pageDataReader
 */

// let data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//     sections: [
//       {
//         title: "Our Recommendations",
//         contents: [
//           { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//           { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//         ],
//       },
//     ],
//   },
// ];

// let contents = pageDataReader(data);
// console.log(contents);
// contents = pageDataReader(data, pageDataReader.PG_EXPLORER);
// console.log(contents);
// contents = pageDataReader(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_INTRO
// );
// console.log(contents);
// contents = pageDataReader(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_RECCOS,
//   pageDataReader.TP_AUDIO
// );
// console.log(contents);
// console.log("done");

/*******************************************************
 * TEST CODE FOR pageDataUpdater
 */

// // data is null
// let data = null;
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_MEDITATE,
//   pageDataReader.SN_INTRO,
//   [
//     { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//     { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//   ]
// );
// console.log(data);

// // add new page
// data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//     sections: [
//       {
//         title: "Our Recommendations",
//         contents: [
//           { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//           { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//         ],
//       },
//     ],
//   },
// ];
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_MEDITATE,
//   pageDataReader.SN_INTRO,
//   [
//     { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//     { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//   ]
// );
// console.log(data);
// // update existing page with no sections
// data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//   },
// ];
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_INTRO,
//   [
//     { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//     { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//   ]
// );
// console.log(data);

// // update existing page with new section
// data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//     sections: [
//       {
//         title: "Our Recommendations",
//         contents: [
//           { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//           { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//         ],
//       },
//     ],
//   },
// ];
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_INTRO,
//   [
//     { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//     { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//   ]
// );
// console.log(data);

// // update existing page with existing section no content
// data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//     sections: [
//       {
//         title: "Our Recommendations",
//       },
//     ],
//   },
// ];
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_RECCOS,
//   [
//     { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//     { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//   ]
// );
// console.log(data);

// // update existing page with existing section new content
// data = [
//   {
//     title: pageDataReader.PG_EXPLORER,
//     sections: [
//       {
//         title: "Our Recommendations",
//         contents: [
//           { type: "audio", title: "one", content: "mfp1.mp3", order: 2 },
//           { type: "audio", title: "two", content: "mfp2.mp3", order: 1 },
//         ],
//       },
//     ],
//   },
// ];
// data = pageDataUpdater(
//   data,
//   pageDataReader.PG_EXPLORER,
//   pageDataReader.SN_RECCOS,
//   [
//     { type: "audio", title: "one", content: "a.mp3", order: 2 },
//     { type: "audio", title: "two", content: "b.mp3", order: 1 },
//   ]
// );
// console.log(data);

// console.log("done");
