import { Gant } from "@/components/gantpage/Gant";
import { Header } from "@/components/gantpage/Header";

import "@/style/index.css"
import "@/style/components/gantpage/Gant.css"


export function GantPage() {

    return (
        <div className="gantpage-container">
            <Header />
            <Gant />
        </div>
    );
}