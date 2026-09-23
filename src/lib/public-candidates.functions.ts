import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/lib/supabase";

export type PublicCandidate = {
  id: string;
  name: string;
  office: "Mayor" | "Council";
  response_status: "received" | "not_received";
  response_date: string | null;
  q1_response: string | null;
  q2_response: string | null;
  q3_response: string | null;
  response_source: string | null;
  last_updated: string;
};

// Select only the fields already visible on the public page. Internal outreach
// notes, email addresses and other private candidate fields stay on the server.
export const getPublicCandidates = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("candidates")
    .select("id,name,office,response_status,response_date,q1_response,q2_response,q3_response,response_source,last_updated")
    .order("name", { ascending: true });

  if (error) {
    console.error("Unable to load public candidate data", error);
    return { candidates: [] as PublicCandidate[], unavailable: true };
  }

  return { candidates: (data ?? []) as PublicCandidate[], unavailable: false };
});
