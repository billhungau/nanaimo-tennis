export type SourceCategory = "City documents" | "News" | "Recreation records" | "Historical records" | "Community statements" | "Candidate statements";

export const candidateQuestions = [
  "The City has announced that the Westwood Lake tennis bubble will be removed after the club closes. Would you support pausing removal until the City has assessed the feasibility of retaining year-round indoor tennis and completed public consultation? Please explain.",
  "Would you support evaluating alternatives such as a nonprofit operator, lease, community partnership or public-private arrangement before the indoor courts are removed?",
  "What role should year-round indoor racquet-sport facilities have in Nanaimo's long-term recreation strategy?",
];

export const candidates = [
  { name: "Brunie Brunie", office: "Mayor" as const },
  { name: "Anne Marie Dryden", office: "Mayor" as const },
  { name: "Leonard Eugene Krog", office: "Mayor" as const },
  { name: "Sarah Lovegrove", office: "Mayor" as const },
].sort((a, b) => a.name.localeCompare(b.name));

export const sources = [
  {
    title: "Candidate nomination documents",
    publisher: "City of Nanaimo",
    date: "September 11, 2026",
    category: "City documents" as SourceCategory,
    url: "https://www.nanaimo.ca/your-government/elections/candidate-nomination-documents",
    summary: "The City's official candidate document page identifies declared candidates for mayor and council. It is the reference used for the candidate tracker.",
    primary: true,
  },
  {
    title: "2026 General Local Election",
    publisher: "City of Nanaimo",
    date: "2026",
    category: "City documents" as SourceCategory,
    url: "https://www.nanaimo.ca/your-government/elections",
    summary: "The City's election page confirms that general voting takes place October 17, 2026. It also provides voting and candidate information.",
    primary: true,
  },
  {
    title: "Nanaimo's Westwood Lake expands through City land purchase",
    publisher: "NanaimoNewsNOW",
    date: "September 16, 2026",
    category: "News" as SourceCategory,
    url: "https://nanaimonewsnow.com/2026/09/16/nanaimos-westwood-lake-expands-through-city-land-purchase/",
    summary: "Reports the City's $2.88-million purchase of the 2.85-acre property. It also reports the November 1 club closure and planned removal of the tennis bubble.",
    primary: false,
  },
  {
    title: "Land acquisition increases area of Westwood Lake Park",
    publisher: "Nanaimo News Bulletin",
    date: "September 17, 2026",
    category: "News" as SourceCategory,
    url: "https://nanaimobulletin.com/2026/09/17/land-acquisition-increases-area-of-westwood-lake-park-in-nanaimo/",
    summary: "Covers the acquisition and reports December 18 as the expected possession date. It describes the City's intended longer-term planning process.",
    primary: false,
  },
  {
    title: "City purchases Westwood Tennis Club property to add to park",
    publisher: "My Coast Now",
    date: "September 17, 2026",
    category: "News" as SourceCategory,
    url: "https://www.mycoastnow.com/94783/news/municipal-news/city-of-nanaimo/city-of-nanaimo-purchases-westwood-tennis-club-property-to-add-to-park/",
    summary: "Reports that the City does not plan to operate the site as a tennis club. Outdoor courts are expected to remain available for public use.",
    primary: false,
  },
  {
    title: "Nanaimo expanding Westwood Lake Park with land purchase",
    publisher: "CHEK News",
    date: "September 16, 2026",
    category: "News" as SourceCategory,
    url: "https://cheknews.ca/nanaimo-expanding-westwood-lake-park-with-2-88m-land-purchase-1348211/",
    summary: "Provides independent coverage of the purchase price, property size and City rationale. Includes the Mayor's public statement about the acquisition.",
    primary: false,
  },
  {
    title: "Townhouse rezoning rejected near Westwood Lake",
    publisher: "NanaimoNewsNOW",
    date: "October 21, 2025",
    category: "Historical records" as SourceCategory,
    url: "https://nanaimonewsnow.com/2025/10/21/not-a-good-fit-townhouse-rezoning-rejected-near-nanaimos-westwood-lake/",
    summary: "Reports Council's 7–2 vote against first reading of an earlier townhouse rezoning proposal for the property. This predates and is separate from the City's acquisition.",
    primary: false,
  },
];

export const unknowns = [
  "Structural assessment of the indoor bubble",
  "Estimated removal cost",
  "Annual operating and maintenance cost",
  "Replacement cost for comparable indoor courts",
  "Feasibility of nonprofit, lease or partnership operation",
];

export const timeline = [
  { date: "Sep 16", year: "2026", title: "Acquisition announced", text: "The City announces its purchase of the Westwood Lake Tennis Club property.", source: sources[2] },
  { date: "Sep 17", year: "2026", title: "Community response begins", text: "Residents begin calling for the indoor facility to be preserved while options are assessed.", source: null },
  { date: "Oct 17", year: "2026", title: "Municipal election", text: "Nanaimo holds its general local election.", source: sources[1] },
  { date: "Nov 1", year: "2026", title: "Expected club closure", text: "Westwood Lake Tennis Club is expected to cease operations.", source: sources[2] },
  { date: "Dec 18", year: "2026", title: "Expected possession", text: "The City is expected to take possession of the property.", source: sources[3] },
  { date: "Future", year: "", title: "Planning and engagement", text: "The City has indicated that broader planning and community engagement will shape future uses.", source: sources[3] },
];