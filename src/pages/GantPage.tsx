import { Gant } from "@/components/gantpage/gant/Gant";
import { Header } from "@/components/gantpage/header/Header";

import "@/style/index.css"
import styles from "@/style/pages/GantPage.module.css"

import { useCallback, useEffect, useState } from "react";
import { LegendPopup } from "@/components/gantpage/gant/LegendPopup";
import TimeLineHeader from "@/components/gantpage/TimeLineHeader";
import { SearchBar } from "@/components/shared/SearchBar";


export function GantPage() {
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [forceDisplayed, setForceDisplayed] = useState<string[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [countDisplayed, setCountDisplayed] = useState<number>(0);

  const toggleLegend = useCallback(() => {
    setIsLegendOpen(prev => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => {
      const nextState = !prev;
      if (!nextState) {
        setSearchTerm("");
      }
      return nextState;
    });
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchTerm("");
    setIsSearchOpen(false);
  }, []);

  //TO PERMET TO REPLACE THE CTRL F OF CHROME BY OUR SEARCHBAR
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) &&( e.key.toLowerCase() === 'f'  || e.key.toLowerCase() === 'כ')) {
        e.preventDefault();
        toggleSearch();
      } 
      else if (e.key.toLowerCase() === 'escape') {
        e.preventDefault();
        handleCloseSearch();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch, handleCloseSearch]);


  return (
    <div className={styles["gantpage-container"]}>
      <Header onMapClick={toggleLegend} toggleSearch={toggleSearch} handleCloseSearch={handleCloseSearch} />

      <TimeLineHeader countDisplayed={countDisplayed} />

      <Gant
        setForceDisplayed={setForceDisplayed}
        searchTerm={searchTerm}
        setCountDisplayed={setCountDisplayed}
      />

      {isLegendOpen && (
        <LegendPopup
          onClose={() => setIsLegendOpen(false)}
          forceDisplayed={forceDisplayed}
        />
      )}

      {isSearchOpen && (
        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClose={() => setIsSearchOpen(false)}
            placeholder="חיפוש קוד שיבוץ , פריטים.."
          />
        </div>
      )}
    </div>
  );
}