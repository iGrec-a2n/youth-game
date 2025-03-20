import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";


const meta: Meta<typeof Card> = {
    title: "components/Card",
    component: Card,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',

    },
    argTypes: {
        onClick: { action: "clicked" },
    },
};

export default meta;


export const Default: StoryObj<typeof Card> = {
    args: {
        image: "https://images.pexels.com/photos/30736845/pexels-photo-30736845/free-photo-of-homme-pensif-appuye-sur-un-escalier-a-l-interieur.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
        name: "Antoine",
        location: "Paris",
        score: 12000,
        rank: 1,
    }
};
export const User: StoryObj<typeof Card> = {
    args: {
        image: "https://images.pexels.com/photos/1441151/pexels-photo-1441151.jpeg?auto=compress&cs=tinysrgb&w=1200",
        name: "Name",
        location: "LOCATION",
        score: 0,
        rank: 100,
    }
};