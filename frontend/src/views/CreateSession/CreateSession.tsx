import { SelectCommunicationModeView } from "./SelectCommunicationMode";
import { SelectFormatView } from "./SelectFormat";
import { SelectLanguageView } from "./SelectLanguage";

export function CreateSessionView() {
  return (
    <section className="h-full w-full flex flex-col items-center">
      <div className="m-2 p-4 w-full max-w-[768px] bg-slate-800">
        <h1 className="text-2xl font-medium">Create your Session</h1>
        <form className="p-2 flex flex-col items-start">
          <div>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" placeholder="Title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input name="description" type="text" placeholder="Description" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input name="date" type="date" />
          </div>
          <div>
            <label htmlFor="startTime">Start time</label>
            <input name="startTime" type="time" />
          </div>
          <div>
            <label htmlFor="endTime">End time</label>
            <input name="endTime" type="time" />
          </div>
          <div>
            <label htmlFor="languages">Languages</label>
            <SelectLanguageView
              name="languages"
              multiple
              defaultValue={"English"}
            />
          </div>
          <div>
            <label htmlFor="communicationModes">Communication modes</label>
            <SelectCommunicationModeView name="communicationModes" multiple />
          </div>
          <div>
            <label htmlFor="formats">Formats</label>
            <SelectFormatView name="formats" multiple />
          </div>
          <div>
            <label htmlFor="participantLimit">Participant limit</label>
            <input
              name="participantLimit"
              type="number"
              min={0}
              defaultValue={5}
            />
          </div>

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-500 self-end"
          >
            Create Session
          </button>
        </form>
      </div>
    </section>
  );
}
