import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ujphnosgrqazigxecrmt.supabase.co";
const supabaseKey = "sb_publishable_0_D6kIyO_Y3fzC2wgSphmQ_3XSUsypi";

export const supabase = createClient(supabaseUrl, supabaseKey);
