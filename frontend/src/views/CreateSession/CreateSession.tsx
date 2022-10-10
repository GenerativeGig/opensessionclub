import { SelectCommunicationModeView } from "./SelectCommunicationMode";
import { SelectFormatView } from "./SelectFormat";
import { SelectLanguageView } from "./SelectLanguage";

export function CreateSessionView() {
  return (
    <section>
      <h1>Create Session</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" />
        <label htmlFor="description">Description</label>
        <input name="description" type="text" />
        <label htmlFor="date">Date</label>
        <input name="date" type="date" />
        <label htmlFor="startTime">Start time</label>
        <input name="startTime" type="time" />
        <label htmlFor="endTime">End time</label>
        <input name="endTime" type="time" />
        <label htmlFor="languages">Languages</label>
        <SelectLanguageView
          name="languages"
          multiple
          defaultValue={"English"}
        />
        <label htmlFor="communicationModes">Communication modes</label>
        <SelectCommunicationModeView name="communicationModes" multiple />
        <label htmlFor="formats">Formats</label>
        <SelectFormatView name="formats" multiple />
        <label htmlFor="participantLimit">Participant limit</label>
        <input name="participantLimit" type="number" min={0} defaultValue={5} />
        <button type="submit">Create Session</button>
      </form>
    </section>
  );
}
