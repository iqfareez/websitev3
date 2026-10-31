import flutree from "../../assets/images/projects/flutree.png";
import tarbawi from "../../assets/images/projects/tarbawi.png";
import peopleInSpace from "../../assets/images/projects/people-space.png";
import type { Project } from "./types";

const projectsDataArchived = [
  {
    title: "Flutree",
    description: `One single link for all your other links.
       Suitable for marketing, Instagram's bio, and even for sharing among your family and friends.
        Take your Flutree wherever your audience is, to help them to discover all your important content.`,
    imgSrc: flutree,
    href: "https://play.google.com/store/apps/details?id=com.iqmal.linktreeflutter",
  },
  {
    title: "Tarbawi 2.0",
    description: `Test your child's basic Islamic knowledge with a quiz game.`,
    imgSrc: tarbawi,
    href: "https://play.google.com/store/apps/details?id=com.maplerr.tarbawiDua",
  },
  {
    title: "People in Space",
    description: `Know who are currently on the earth orbit now!
      Apps available for Android and Web. API is available to use.`,
    imgSrc: peopleInSpace,
    href: "https://play.google.com/store/apps/details?id=com.iqfareez.people_in_space",
  },
] satisfies Project[];

export default projectsDataArchived;
