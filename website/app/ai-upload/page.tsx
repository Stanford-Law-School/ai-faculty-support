import { redirect } from "next/navigation";
import { AI_UPLOAD_URL } from "../lib/site";

// Preserve old bookmarks while sending readers directly to the digest's own app.

export default function AiUploadPage() {
  redirect(AI_UPLOAD_URL);
}
