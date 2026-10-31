import wayfinder from "../../assets/images/projects/koe-wayfinder.png";
import trashBin from "../../assets/images/projects/smart-trash-bin.jpg";
import weatherStation from "../../assets/images/projects/ia-weather-station.jpg";
import parcelBox from "../../assets/images/projects/gene-parcel.png";
import type { Project } from "./types";

const projectsDataUniversity = [
  {
    title: "KOEWayfinder - AR Navigation App",
    description: `A Final Year Project (FYP) to complete my bachelor degree. 
      The project aims to address the challenges of indoor navigation within faculty building
      by using Augmented Reality technology. Utilizes SuperPoint & SuperGlue algorithm
      to build localization pipeline.`,
    imgSrc: wayfinder,
    href: "https://github.com/KOE-Wayfind/",
  },
  {
    title: "Smart Trash Bin",
    description: `An Integrated Design Project (IDP) project. 
      Some features including: Interactive trash level indicator, notification
      through Telegram, hand sensor, automatic lid etc. Also comes with a 
      mobile app to view realtime status of the bin.`,
    imgSrc: trashBin,
    href: "https://docs.google.com/presentation/d/1xpqHdYDqdd6iYqOgnxsjHbQ5tGCwdeG6IJbDviTlwqM/edit?usp=sharing",
  },
  {
    title: "IoT Weather Station",
    description: `DIY Weather Station that will keep track of the weather and notify you when 
          it is time to pick up your clothes from clothesline. An Industrial Automation project.`,
    imgSrc: weatherStation,
    href: "https://github.com/iqfareez/IA-Project-Weather-Station",
  },
  {
    title: "Parcel Safety Box",
    description: `Protect your parcel from thief in a PIN-protected slot. Receiver
      can unlock the slot using PIN that has been sent to Telegram. An Engineering Ethics project.`,
    imgSrc: parcelBox,
    href: "https://youtu.be/KFbdNpS7P3A",
  },
] satisfies Project[];

export default projectsDataUniversity;
