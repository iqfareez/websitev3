import prayerTime from "../../assets/images/projects/mptsolat.png";
import wiwitApps from "../../assets/images/projects/wiwit-apps.jpg";
import type { Project } from "./types";

const projectsDataHighlights = [
  {
    title: "Malaysia Prayer Time app",
    description: `Open-source prayer time application for Malaysian to quickly view their solah time. Azan
      will be played during prayer time. Other useful features including monthly prayer timetable, 
      qibla compass, tasbih and many more.`,
    imgSrc: prayerTime,
    href: "https://waktusolat.app",
  },
  {
    title: "Wiwit. A finance tracker app",
    description: `A self-hostable personal finance tracker for managing income, expenses, categories,
      and debts. Get a clear view of your budgets and cash flow on desktop and mobile. Possible integration with other services using the REST API provided.`,
    imgSrc: wiwitApps,
    href: "https://wiwit.iqfareez.com",
  },
] satisfies Project[];

export default projectsDataHighlights;
