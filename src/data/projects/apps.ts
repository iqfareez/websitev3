import schedule from "../../assets/images/projects/iium-schedule.png";
import smartQuran from "../../assets/images/projects/smart-quran-showcase.jpg";
import googlePlay from "../../assets/images/projects/more-on-google-play.png";
import type { Project } from "./types";

const projectsDataApps = [
  {
    title: "IIUM Schedule",
    description: `Automatic schedule generator for IIUM students.
      From i-Malu'um/prereg to the schedule. Available for Android, Windows and Web`,
    imgSrc: schedule,
    href: "https://iiumschedule.iqfareez.com",
  },
  {
    title: "Smart Quran",
    description:
      "Smart Quran app with a refreshed modern new design with updated mushaf and revised translations.",
    imgSrc: smartQuran,
  },
  {
    title: "More apps",
    description: "Visit my Google Play developer page",
    imgSrc: googlePlay,
    href: "https://play.google.com/store/apps/dev?id=9200064795631584674",
  },
] satisfies Project[];

export default projectsDataApps;
