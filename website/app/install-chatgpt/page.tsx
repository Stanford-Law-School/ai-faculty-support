import { getSkill } from "../lib/skills";
import { DownloadButton } from "../components/DownloadButton";

const demoVideoUrl = "https://drive.google.com/file/d/1U6j814O6CARktBdoXGrMNHzanFbVvjaS/preview";

export default function InstallChatGPT() {
  const skill = getSkill("course-and-syllabus-designer");

  return (
    <>
      <p className="eyebrow">Installation</p>
      <h1>Install in ChatGPT</h1>
      <p className="lede">
        Download the Skill ZIP, then add it once to a ChatGPT workspace or GPT
        configuration that supports uploaded Skills. After the ZIP has been
        added, you can call that Skill across multiple chats without uploading
        the same ZIP again.
      </p>
      <DownloadButton skill={skill} />
      <section className="videoDemo" aria-labelledby="chatgpt-install-video-heading">
        <div>
          <p className="eyebrow">Screen recording</p>
          <h2 id="chatgpt-install-video-heading">See how to add and call a Skill</h2>
          <p>
            This short recording shows how to add the Skill ZIP to ChatGPT and
            start using it. You only need to add the ZIP file one time; once it
            is available in ChatGPT, you can reuse the Skill in multiple chats.
          </p>
        </div>
        <iframe
          src={demoVideoUrl}
          title="Screen recording: add and call a ChatGPT Skill"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </section>
      <section className="steps">
        <div className="step">
          <h2>1. Download</h2>
          <p>Use the Download Skill ZIP button. Do not unzip it unless your local instructions require inspection.</p>
        </div>
        <div className="step">
          <h2>2. Upload once</h2>
          <p>
            Open the ChatGPT place where you manage Skills or custom GPT
            knowledge, choose the ZIP, and wait for the upload to finish. Keep
            the ZIP installed there so you can use the Skill in later chats.
          </p>
        </div>
        <div className="step">
          <h2>3. Start</h2>
          <p>Ask: “Help me design a syllabus for my course.” Include course title, audience, term length, and any required policies.</p>
        </div>
      </section>
    </>
  );
}
