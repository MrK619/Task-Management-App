import React from "react";
import { Header } from "@/components/Header";
// import { AddTask } from "@/components/AddTask";
import { TaskList } from "@/components/Displaycard";
export default function Home() {
    return (
        <>
            <Header />
            <TaskList />
        </>
    );
}
