export type SourceCategory = "City documents" | "News" | "Recreation records" | "Historical records" | "Community statements" | "Candidate statements";

export type CandidateOffice = "Mayor" | "Council";
export type CandidateResponseStatus = "received" | "not_received";

export type Candidate = {
  name: string;
  office: CandidateOffice;
  responseStatus: CandidateResponseStatus;
  responseDate?: string;
  responses?: [string, string, string];
  responseSource?: string;
  lastUpdated?: string;
};

export const candidateQuestions = [
  "Would you support pausing removal of the Westwood Lake indoor tennis facility until the City has completed public consultation and assessed whether year-round indoor tennis can feasibly be retained? Please explain.",
  "Would you support evaluating nonprofit, lease, partnership or other operating models before the indoor facility is removed?",
  "What role should year-round indoor racquet-sport facilities play in Nanaimo's long-term recreation planning?",
];

const makeCandidate = (name: string, office: CandidateOffice): Candidate => ({
  name,
  office,
  responseStatus: "not_received",
});

export const candidates: Candidate[] = [
  makeCandidate("Brunie Brunie", "Mayor"),
  makeCandidate("Anne Marie Dryden", "Mayor"),
  makeCandidate("Leonard Eugene Krog", "Mayor"),
  makeCandidate("Sarah Lovegrove", "Mayor"),
  ...[
    "Jeff Annesley", "Sheryl Armstrong", "Sandy Bartlett", "Ken Bennett", "Marnie Boers", "Jackie Bolen", "Mark Richard Chandler", "Paul Chapman", "Malcolm Cooke", "Andréa Coutu", "Shane Crawley", "Ryan Djakovic", "Hilary Eastmure", "Joe Figel", "Meg Fyfe Watkins", "Ben Geselbracht", "Bryan William Gordon", "Anita Gail Greer", "Patrick Gunville", "Derek Hanna", "Richard Harlow", "Erin Colleen Hemmens", "Steven Mark Johns", "Cameron James Leckenby", "Max Douglas MacKay", "Paul Manly", "Bryant Marshall", "Bill McKay", "Andrew Merilees", "Matthew Miller", "Zaki Paris Mohammed", "Rod Moreno", "Janice Perrino", "Rob Phelan", "Frank Pluta", "Austin Seng", "Holden Southward", "Ian Thorpe", "Paul Van Ryssel", "Angela Hope Waldick",
  ].map((name) => makeCandidate(name, "Council")),
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
    title: "City of Nanaimo expands Westwood Lake Park with new land acquisition",
    publisher: "City of Nanaimo",
    date: "September 16, 2026",
    category: "City documents" as SourceCategory,
    url: "https://www.nanaimo.ca/NewsReleases/NR260916CityOfNanaimoExpandsWestwoodLakeParkWithNewLandAcquisition.html",
    summary: "The City's announcement confirms the property acquisition, states that the club will cease operations and that the bubble will be removed, and says future uses will be shaped through planning and community engagement.",
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
    title: "Urge Nanaimo to preserve Westwood Lake indoor tennis courts",
    publisher: "Change.org",
    date: "September 17, 2026",
    category: "Community statements" as SourceCategory,
    url: "https://www.change.org/p/urge-nanaimo-to-preserve-westwood-lake-indoor-tennis-courts",
    summary: "A community-organized petition asking Nanaimo City Council to preserve the indoor courts while alternative operating models are considered. This is a community advocacy source, not a City document.",
    primary: true,
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
  "Structural assessment and remaining useful life of the indoor bubble",
  "Estimated removal cost",
  "Annual operating and maintenance cost",
  "Replacement cost for comparable indoor courts",
  "Current indoor-court utilization and number of users",
  "Whether nonprofit, lease or partnership operating models have been formally assessed",
];

export const timeline = [
  { date: "Sep 16", year: "2026", title: "Acquisition announced", text: "The City announces its purchase of the Westwood Lake Tennis Club property.", status: "Occurred", source: sources[2] },
  { date: "Sep 17", year: "2026", title: "Community response begins", text: "A community-organized public petition asks the City to preserve the indoor facility while alternatives are assessed.", status: "Occurred", source: sources[7] },
  { date: "Oct 17", year: "2026", title: "Municipal election", text: "Nanaimo holds its general local election.", status: "Scheduled", source: sources[1] },
  { date: "Nov 1", year: "2026", title: "Expected club closure", text: "Westwood Lake Tennis Club is expected to cease operations.", status: "Expected", source: sources[2] },
  { date: "Dec 18", year: "2026", title: "Expected possession", text: "The City is expected to take possession of the property.", status: "Expected", source: sources[4] },
  { date: "Future", year: "", title: "Planning and engagement", text: "The City has indicated that broader planning and community engagement will shape future uses.", status: "Future", source: sources[2] },
];
