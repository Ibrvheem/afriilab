import React from "react";
import EmptyState from "./_components/EmptyState";
import { Page } from "@/components/organisms/page";
import CreateButton from "./_components/CreateButton";

function HomePage() {
  return (
    <Page
      title="Your Study"
      description="Explore all your courses"
      actions={<CreateButton />}
    >
      {/* <EmptyState /> */}
    </Page>
    // <>
    //   <EmptyState />
    // </>
  );
}

export default HomePage;
