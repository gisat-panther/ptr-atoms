import classnames from 'classnames';
import PropTypes from 'prop-types';
import AngleDoubleDown from './components/AngleDoubleDown';
import AngleDoubleLeft from './components/AngleDoubleLeft';
import AngleDoubleRight from './components/AngleDoubleRight';
import AngleDoubleUp from './components/AngleDoubleUp';
import ArrowLeft from './components/ArrowLeft';
import Calendar from './components/Calendar';
import Circle from './components/Circle';
import ChevronLeft from './components/ChevronLeft';
import ChevronRight from './components/ChevronRight';
import Crop from './components/Crop';
import Delete from './components/Delete';
import Dots from './components/Dots';
import Download from './components/Download';
import Edit from './components/Edit';
import Expand from './components/Expand';
import ExpandRow from './components/ExpandRow';
import ExternalLink from './components/ExternalLink';
import FileCsv from './components/FileCsv';
import FileExport from './components/FileExport';
import FileJson from './components/FileJson';
import FileXls from './components/FileXls';
import Filter from './components/Filter';
import Facebook from './components/Facebook';
import Gear from './components/Gear';
import Gisat from './components/Gisat';
import Globe from './components/Globe';
import Info from './components/Info';
import Opacity from './components/Opacity';
import Layers from './components/Layers';
import Legend from './components/Legend';
import LinkedIn from './components/LinkedIn';
import Mail from './components/Mail';
import MapPin from './components/MapPin';
import Menu from './components/Menu';
import Minus from './components/Minus';
import MinusThick from './components/MinusThick';
import Monitor from './components/Monitor';
import Monitoring from './components/Monitoring';
import NorthArrow from './components/NorthArrow';
import Phone from './components/Phone';
import Plus from './components/Plus';
import PlusThick from './components/PlusThick';
import Pushpin from './components/Pushpin';
import Restore from './components/Restore';
import ResearchGate from './components/ResearchGate';
import RotateLeft from './components/RotateLeft';
import RotateRight from './components/RotateRight';
import Search from './components/Search';
import Shapefile from './components/Shapefile';
import Share from './components/Share';
import TiltMore from './components/TiltMore';
import TiltLess from './components/TiltLess';
import Times from './components/Times';
import TriangleDown from './components/TriangleDown';
import Twitter from './components/Twitter';
import Upload from './components/Upload';
// import RotateLeftCircularArrow from './components/RotateLeftCircularArrow';
// import RotateRightCircularArrow from './components/RotateRightCircularArrow';

import './icon.scss';

const getIcon = key => {
	switch (key) {
		case 'angle-double-right':
			return <AngleDoubleRight />;
		case 'angle-double-left':
			return <AngleDoubleLeft />;
		case 'angle-double-up':
			return <AngleDoubleUp />;
		case 'angle-double-down':
			return <AngleDoubleDown />;
		case 'arrow-left':
		case 'back':
			return <ArrowLeft />;
		case 'calendar':
			return <Calendar />;
		case 'circle':
			return <Circle />;
		case 'chevron-left':
			return <ChevronLeft />;
		case 'chevron-right':
			return <ChevronRight />;
		case 'crop':
			return <Crop />;
		case 'delete':
			return <Delete />; //todo
		case 'dots':
			return <Dots />;
		case 'download':
			return <Download />; //todo
		case 'edit':
			return <Edit />;
		case 'expand':
			return <Expand />; //todo
		case 'expand-row':
			return <ExpandRow />;
		case 'external-link':
			return <ExternalLink />;
		case 'facebook':
			return <Facebook />;
		case 'filter':
			return <Filter />;
		case 'file-export':
			return <FileExport />;
		case 'file-csv':
		case 'csv':
			return <FileCsv />;
		case 'file-json':
		case 'json':
			return <FileJson />;
		case 'file-xls':
		case 'xls':
		case 'excel':
			return <FileXls />;
		case 'gear':
		case 'settings':
			return <Gear />;
		case 'gisat':
			return <Gisat />;
		case 'globe':
			return <Globe />;
		case 'info':
			return <Info />;
		case 'layers':
			return <Layers />;
		case 'legend':
			return <Legend />;
		case 'linkedin':
			return <LinkedIn />;
		case 'mail':
			return <Mail />;
		case 'map-pin':
			return <MapPin />;
		case 'menu':
			return <Menu />;
		case 'minus':
			return <Minus />; //todo
		case 'minus-thick':
			return <MinusThick />;
		case 'monitor':
		case 'display':
			return <Monitor />;
		case 'monitoring':
			return <Monitoring />;
		case 'north-arrow':
			return <NorthArrow />;
		case 'opacity':
			return <Opacity />; //todo
		case 'phone':
			return <Phone />;
		case 'plus':
			return <Plus />;
		case 'plus-thick':
			return <PlusThick />;
		case 'pushpin':
			return <Pushpin />; //todo
		case 'researchgate':
			return <ResearchGate />;
		case 'restore':
			return <Restore />;
		case 'rotate-left':
			return <RotateLeft />;
		case 'rotate-right':
			return <RotateRight />;
		case 'search':
			return <Search />; //todo
		case 'shapefile':
			return <Shapefile />;
		case 'share':
			return <Share />;
		case 'tilt-less':
			return <TiltLess />; //todo
		case 'tilt-more':
			return <TiltMore />; //todo
		case 'times':
		case 'close':
			return <Times />;
		case 'triangle-down':
			return <TriangleDown />;
		case 'twitter':
			return <Twitter />;
		case 'upload':
			return <Upload />; //todo
		default:
			return (
				<g>
					<rect
						x="4.844"
						y="4.844"
						fill="none"
						stroke="#FF3333"
						strokeMiterlimit="10"
						width="22.313"
						height="22.313"
					/>
					<line
						fill="none"
						stroke="#FF3333"
						strokeMiterlimit="10"
						x1="27.156"
						y1="4.844"
						x2="4.844"
						y2="27.156"
					/>
					<line
						fill="none"
						stroke="#FF3333"
						strokeMiterlimit="10"
						x1="4.844"
						y1="4.844"
						x2="27.156"
						y2="27.156"
					/>
				</g>
			);
	}
};

const PantherIcon = ({style, className, icon}) => (
	<svg
		style={style} //todo better solution (used for transform: rotate)
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		width="32px"
		height="32px"
		viewBox="0 0 32 32"
		xmlSpace="preserve"
		className={classnames('ptr-icon', className)}
	>
		{typeof icon === 'function' ? icon() : getIcon(icon)}
	</svg>
);

PantherIcon.propTypes = {
	className: PropTypes.string,
	icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	style: PropTypes.object,
};

export default PantherIcon;
