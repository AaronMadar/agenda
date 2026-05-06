import React, { useState, useRef, memo, useEffect } from "react";
import dayjs from "dayjs";
import { Popover, Tooltip } from "@mui/material";

import { PercentageWithArrow } from "@/components/shared/PercentageWithArrow";
import { ResourcePopUp } from "@/components/shared/pop-ups/ResourcePopUp";
import { DetailsPopUp } from "@/components/shared/pop-ups/DetailsPopUp";
import { KeyValPopUp } from "@/components/shared/pop-ups/KeyValPopUp";

import { Details, ArrowRight, ArrowLeft } from "@/assets/icons";
// import { iconResources, iconServiceType } from "@/constants/icons";
import { iconServiceType } from "@/constants/icons";
import { getResourceIcon } from "@/constants/budgetResources";
import { useViewSettings } from "@/contexts/GantViewSettingsContext";
import type { Shibutz, Resource } from "@/types/shibutzim.types";

import styles from "@/style/components/gantpage/gant/ShibutsCard.module.css";

interface ShibutsCardProps {
  shibuts: Shibutz;
  style?: React.CSSProperties;
  className?: string;
}

export const ShibutsCard = memo(function ShibutsCard({
  shibuts,
  style,
  className,
}: ShibutsCardProps) {
  const [detailsAnchorEl, setDetailsAnchorEl] = useState<HTMLElement | null>(null);
  const [resourceAnchorEl, setResourceAnchorEl] = useState<HTMLElement | null>(null);
  const [titleAnchorEl, setTitleAnchorEl] = useState<HTMLElement | null>(null);
  const [hoveredResource, setHoveredResource] = useState<Resource | null>(null);
  const [isCardActive, setIsCardActive] = useState(false);

  const resourceDivRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { showOpenCards, isLittleScreen, activeCardWidthPercent } = useViewSettings();

  const {
    title,
    variationPastYear,
    dateBegin,
    dateEnd,
    resources,
    serviceType,
    forceType,
    codeShibutz,
    mesima,
    directCost,
    costOfItems,
    unitId,
    location,
  } = shibuts;

  /* ---------------- HORIZONTAL SCROLL LOGIC ---------------- */

  useEffect(() => {
    const resourceDiv = resourceDivRef.current;
    if (!resourceDiv) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        resourceDiv.scrollLeft += e.deltaY * 0.4;
      }
    };

    resourceDiv.addEventListener("wheel", handleWheel, { passive: false });
    return () => resourceDiv.removeEventListener("wheel", handleWheel);
  }, []);

  /* ---------------- ICON ---------------- */

  const icon =
    iconServiceType[serviceType as keyof typeof iconServiceType] ??
    iconServiceType.default;

  /* ---------------- DATES ---------------- */

  const formattedBegin = dateBegin ? dayjs(dateBegin).format("D MMM") : "";
  const formattedEnd = dateEnd ? dayjs(dateEnd).format("D MMM") : "";

  const amountOfDays =
    dateBegin && dateEnd
      ? dayjs(dateEnd).diff(dayjs(dateBegin), "day") + 1
      : null;

  /* ---------------- METADATA ---------------- */

  const metadataShibuts = [
    { key: "קוד שיבוץ", value: codeShibutz },
    { key: "יחידה", value: unitId },
    { key: "מיקום", value: location },
    { key: "משימה", value: mesima },
    { key: "סוג שירות", value: serviceType },
    { key: "תיאור שירות", value: forceType },
    { key: "עלות ישיר", value: String(directCost) },
    { key: "עלות פריטי", value: String(costOfItems) },
    { key: "משך", value: amountOfDays ? `${amountOfDays} ימים` : "-" },
  ];

  /* ---------------- HOVER LOGIC ---------------- */

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const delayedClose = (
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ) => {
    closeTimerRef.current = setTimeout(() => {
      setter(null);
    }, 80);
  };

  const scroll = (amount: number) => {
    if (!resourceDivRef.current) return;
    resourceDivRef.current.scrollLeft += amount;
  };

  const handleCardLeave = () => {
    setIsCardActive(false);
    setDetailsAnchorEl(null);
    setResourceAnchorEl(null);
    setTitleAnchorEl(null);
  };

  /* ---------------- REUSABLE POPOVER ---------------- */

  const renderPopover = (
    open: boolean,
    anchorEl: HTMLElement | null,
    setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    children: React.ReactNode,
    anchorOrigin: any,
    transformOrigin: any
  ) => (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      disableRestoreFocus
      sx={{ pointerEvents: "none" }}
      slotProps={{
        paper: {
          onMouseEnter: clearCloseTimer,
          onMouseLeave: () => delayedClose(setAnchor),
          sx: {
            pointerEvents: "auto",
            backgroundColor: "transparent",
            borderRadius: "10px",
            overflow: "visible",
          },
        },
      }}
    >
      {children}
    </Popover>
  );

  /* ---------------- RENDER ---------------- */

  return (
    <div
      className={`${styles.shibutsCard} ${(isCardActive || showOpenCards) ? styles.activeCard : ""

        }
      
      ${isLittleScreen ? styles.activecardlittleScreen : ""}
      ${className || ""}`}

      style={{
        ...style,
        ...(isCardActive && { minWidth: `${activeCardWidthPercent}%` })
      }}
      onMouseEnter={() => setIsCardActive(true)}
      onMouseLeave={handleCardLeave}
    >
      {/* ---------- TOP ---------- */}
      <div className={styles.divUp}>
        <div className={styles.iconAndTitle}>
          <Tooltip title={serviceType} arrow placement="top">
            <i className={`icon-card ${icon.className}`} />
          </Tooltip>

          <span
            className={styles.cardTitle}
            onMouseEnter={(e) => {
              clearCloseTimer();
              setTitleAnchorEl(e.currentTarget);
            }}
            onMouseLeave={() => delayedClose(setTitleAnchorEl)}
          >
            {title}
          </span>
        </div>

        <div
          className={`${styles.variationContainer} ${
            isCardActive || showOpenCards ? styles.visible : ""
          }`}
        >
          <div className={styles.detailsAndPercentage}>
            <div
              className={styles.detailsButton}
              onClick={(e) => {
                clearCloseTimer();
                setDetailsAnchorEl(e.currentTarget);
              }}
              onMouseLeave={() => delayedClose(setDetailsAnchorEl)}
            >
              <Details className={styles.detailsIcon} />
            </div>

            <PercentageWithArrow value={variationPastYear} gantMode />
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM ---------- */}
      <div className={styles.divDown} style={{ opacity: (isCardActive || showOpenCards) ? 1 : 0 }}>
        <div className={styles.flexRow}>
          {formattedBegin && formattedEnd && (
            <Tooltip title={`${amountOfDays} ימים`} arrow>
              <span className={styles.spanDate}>
                {formattedBegin} - {formattedEnd}
              </span>
            </Tooltip>
          )}

          <div className={styles.resourceContainer}>
            <ArrowRight className={styles.arrow} onClick={() => scroll(-92)}/>
            <div className={styles.resourceDiv} ref={resourceDivRef}>
              {resources?.map((res) => (
                <div
                  key={res.categoryName}
                  className={styles.divRessource}
                  style={{ flexShrink: 0 }}
                  onMouseEnter={(e) => {
                    clearCloseTimer();
                    setHoveredResource(res);
                    setResourceAnchorEl(e.currentTarget);
                    setTitleAnchorEl(null);
                  }}
                  onMouseLeave={() => delayedClose(setResourceAnchorEl)}
                >
                  <i className={getResourceIcon(res.categoryName)} />
                  <span>{res.categoryName}</span>
                </div>
              ))}
            </div>
            <ArrowLeft className={styles.arrow} onClick={() => scroll(92)} />
          </div>
        </div>
      </div>

      {/* ---------- POPOVERS ---------- */}

      {renderPopover(
        Boolean(detailsAnchorEl),
        detailsAnchorEl,
        setDetailsAnchorEl,
        <DetailsPopUp />,
        { vertical: "top", horizontal: "center" },
        { vertical: "bottom", horizontal: "center" }
      )}

      {renderPopover(
        Boolean(titleAnchorEl),
        titleAnchorEl,
        setTitleAnchorEl,
        <KeyValPopUp header={title} keyValues={metadataShibuts} />,
        { vertical: "top", horizontal: "center" },
        { vertical: "bottom", horizontal: "center" }
      )}

      {renderPopover(
        Boolean(resourceAnchorEl),
        resourceAnchorEl,
        setResourceAnchorEl,
        <ResourcePopUp resName={hoveredResource?.categoryName} resourceDetailsTable={hoveredResource?.items || []} />,
        { vertical: "bottom", horizontal: "center" },
        { vertical: "top", horizontal: "center" }
      )}
    </div>
  );
});