import React from "react";
import EmptyState from "./_components/EmptyState";
import { Page } from "@/components/organisms/page";
import CreateButton from "./_components/CreateButton";
import FlashCards from "./_components/flashCards";
import { getFlashCards } from "./services";

async function HomePage() {
  const data = await getFlashCards();

  return (
    <Page
      title="Your Study"
      description="Explore all your courses"
      actions={<CreateButton />}
    >
      <div></div>
      {data?.cards?.length < 1 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-4 gap-2 relative">
          {data?.cards?.map((card) => {
            return <FlashCards card={card} key={card.question} />;
          })}
        </div>
      )}
    </Page>
  );
}

export default HomePage;
