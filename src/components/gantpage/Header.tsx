import React, { useState } from 'react';

import { SelectTime } from "./header/SelectTime";
import { PopoverTime } from "./header/PopoverTime";

import "@/style/components/gantpage/Header.css";


export function Header() {
    // AnchorEl contains the HtmlElement where the popover will be anchored
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // Function to handle popover opening
    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget); // event.currentTarget is the element that was clicked
    };

    return (
        <header className="header">
            <div className="header-actions">
                <div className="header-actions-primary">
                    <i className='bi bi-funnel header-icon' />
                    <i className='bi bi-map header-icon' />
                    <i className='bi bi-bell header-icon' />
                    <i className='bi bi-search header-icon' />
                </div>
                <span className="header-separator"></span>
                <div className="header-actions-secondary">
                    <i className='bi bi-pencil header-icon' />
                    <i className='bi bi-bookmark header-icon' />
                    <i className='bi bi-arrow-clockwise header-icon' />
                    <i className='bi bi-printer header-icon' />
                    <i className='bi bi-camera header-icon' />
                </div>
            </div>
            <div className="header-time-controls">
                <i className="bi bi-calendar-date header-icon"
                    onClick={handleOpenPopover} />

                <PopoverTime anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                <SelectTime />
            </div>
        </header>
    )
}