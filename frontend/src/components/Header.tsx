import * as React from "react";
import { ModeToggle } from "./ui/Darkmodetoggle";

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
    return (
        <header>
            <div className="flex p-10 space-x-3">
                <h2 className="bold text-2xl ">Text Management System</h2>
                <ModeToggle />
            </div>
        </header>
    );
}
