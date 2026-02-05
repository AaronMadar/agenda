import { useNavigate } from 'react-router-dom';

import "@/style/components/gantpage/Header.css";
import { ControlsPanel } from '../shared/ControlsPanel';

interface HeadeProps {
    onMapClick: () => void
}

export function Header({ onMapClick }: HeadeProps) {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-actions">
                <div className="header-actions-primary">
                    <i className='bi bi-speedometer2 header-icon'
                        onClick={() => navigate('/dashboard')}
                        title="Dashboard" />
                    <i className='bi bi-funnel header-icon' />
                    <i className='bi bi-map header-icon' onClick={onMapClick} title="legend" />
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
            <i className='control-icon bi bi-grid header-icon' />
            <div className="header-time-controls">
                <ControlsPanel />
            </div>
        </header>
    )
}