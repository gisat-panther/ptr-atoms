import PropTypes from 'prop-types';
import {IconContext} from 'react-icons';
import classnames from 'classnames';
import {
	MdArrowBack as Back,
	MdArrowForward as Forward,
	MdMoreHoriz as MoreDots,
	MdClose as Close,
	MdCompare as Compare,
	MdExpandLess as ChevronUp,
	MdExpandMore as ChevronDown,
	MdHelpOutline as Help,
	MdOutlineArrowBackIos as ChevronLeft,
	MdOutlineArrowForwardIos as ChevronRight,
	MdOutlineCheck as Check,
	MdOutlineFileDownload as Download,
	MdOutlineSpaceDashboard as Applications,
	MdOutlineInfo as Info,
	MdFilterNone as Collections,
	MdOutlineAddCircleOutline as Plus,
	MdOutlineFeed as Story,
	MdOutlineFolder as Datasets,
	MdOutlineDarkMode as DarkMode,
	MdOutlineAccountCircle as Account,
	MdOutlineLayersClear as RemoveLayers,
	MdLeaderboard as BarChart,
	MdLocationSearching as LocationSearch,
	MdLocationCity as City,
	MdLogin as Login,
	MdLogout as Logout,
	MdDashboard as Dashboard,
	MdDashboardCustomize as AddMap,
	MdReadMore as ReadMore,
	MdOutlineShare as Share,
	MdStarOutline as Star,
	MdOutlineThumbUpOffAlt as ThumbUp,
	MdTune as Tune,
	MdOutlineVerticalAlignCenter as VerticalAlignCenter,
	MdFilterList as Filter,
	MdImageSearch as ImageSearch,
	MdOutlineMiscellaneousServices as Services,
	MdScatterPlot as ScatterChartBasic,
	MdShowChart as LineChartBasic,
	MdMinimize as Minimise,
	MdOutlineContentPasteSearch as UseCase,
} from 'react-icons/md';
import {
	SiZenodo as Zenodo,
	SiFacebook as Facebook,
	SiTwitter as Twitter,
	SiLinkedin as Linkedin,
	SiResearchgate as Researchgate,
} from 'react-icons/si';
import {AiFillHome as Home} from 'react-icons/ai';
import {BiWater as Water} from 'react-icons/bi';
import {
	GoPrimitiveDot as Dot,
	GoPrimitiveSquare as Square,
	GoTools as Tools,
} from 'react-icons/go';
import {
	HiCursorClick as Selection,
	HiOutlineDatabase as Database,
	HiOutlineClipboardCopy as ClipboardCopy,
} from 'react-icons/hi';
import {
	HiCursorArrowRipple as Tooltip,
	HiGlobeEuropeAfrica as GlobeOutline,
} from 'react-icons/hi2';
import {ImStatsBars as Statistics} from 'react-icons/im';
import {
	TbSatellite as Satellite,
	TbZoomInArea as ZoomInArea,
} from 'react-icons/tb';
import {FaMountain as Mountain, FaGlobeAfrica as Globe} from 'react-icons/fa';
import './style.scss';

const ReactIcon = ({icon, className, style}) => {
	let i = null;
	let classes = classnames('ptr-react-icon', className);

	switch (icon) {
		case 'ri-add-map':
			i = <AddMap />;
			break;
		case 'ri-applications':
			i = <Applications />;
			break;
		case 'ri-back':
			i = <Back />;
			break;
		case 'ri-bar-chart':
			i = <BarChart />;
			break;
		case 'ri-check':
			i = <Check />;
			break;
		case 'ri-chevron-down':
			i = <ChevronDown />;
			break;
		case 'ri-chevron-up':
			i = <ChevronUp />;
			break;
		case 'ri-chevron-left':
			i = <ChevronLeft />;
			break;
		case 'ri-chevron-right':
			i = <ChevronRight />;
			break;
		case 'ri-city':
			i = <City />;
			break;
		case 'ri-close':
			i = <Close />;
			break;
		case 'ri-collections':
			classes = classnames(classes, 'clockwise270');
			i = <Collections />;
			break;
		case 'ri-compare':
			i = <Compare />;
			break;
		case 'ri-dashboard':
			i = <Dashboard />;
			break;
		case 'ri-database':
			i = <Database />;
			break;
		case 'ri-datasets':
			i = <Datasets />;
			break;
		case 'ri-dark-mode':
			i = <DarkMode />;
			break;
		case 'ri-download':
			i = <Download />;
			break;
		case 'ri-forward':
			i = <Forward />;
			break;
		case 'ri-globe':
			i = <Globe />;
			break;
		case 'ri-globe-outline':
			i = <GlobeOutline />;
			break;
		case 'ri-help':
			i = <Help />;
			break;
		case 'ri-info':
			i = <Info />;
			break;
		case 'ri-line-chart-basic':
			i = <LineChartBasic />;
			break;
		case 'ri-location-search':
			i = <LocationSearch />;
			break;
		case 'ri-login':
			i = <Login />;
			break;
		case 'ri-logout':
			i = <Logout />;
			break;
		case 'ri-3D-view':
			i = <Mountain />;
			break;
		case 'ri-more-dots':
			i = <MoreDots />;
			break;
		case 'ri-plus':
		case 'ri-add':
			i = <Plus />;
			break;
		case 'ri-read-more':
			i = <ReadMore />;
			break;
		case 'ri-remove-layers':
			i = <RemoveLayers />;
			break;
		case 'ri-satellite':
			i = <Satellite />;
			break;
		case 'ri-scatter-chart-basic':
			i = <ScatterChartBasic />;
			break;
		case 'ri-selection':
			i = <Selection />;
			break;
		case 'ri-share':
			i = <Share />;
			break;
		case 'ri-star':
			i = <Star />;
			break;
		case 'ri-story':
			i = <Story />;
			break;
		case 'ri-thumb-up':
			i = <ThumbUp />;
			break;
		case 'ri-tune':
		case 'ri-configure':
		case 'ri-settings':
			i = <Tune />;
			break;
		case 'ri-use-case':
			i = <UseCase />;
			break;
		case 'ri-user':
			i = <Account />;
			break;
		case 'ri-facebook':
			i = <Facebook />;
			break;
		case 'ri-twitter':
			i = <Twitter />;
			break;
		case 'ri-linkedin':
			i = <Linkedin />;
			break;
		case 'ri-researchgate':
			i = <Researchgate />;
			break;
		case 'ri-zenodo':
			i = <Zenodo />;
			break;
		case 'ri-home':
			i = <Home />;
			break;
		case 'ri-dot':
			i = <Dot />;
			break;
		case 'ri-square':
			i = <Square />;
			break;
		case 'ri-filter':
			i = <Filter />;
			break;
		case 'ri-services':
			i = <Services />;
			break;
		case 'ri-imgSearch':
			i = <ImageSearch />;
			break;
		case 'ri-tools':
			i = <Tools />;
			break;
		case 'ri-tooltip':
			i = <Tooltip />;
			break;
		case 'ri-statistics':
			i = <Statistics />;
			break;
		case 'ri-vertical-align-center':
			i = <VerticalAlignCenter />;
			break;
		case 'ri-water':
			i = <Water />;
			break;
		case 'ri-minimise':
			i = <Minimise />;
			break;
		case 'ri-zoom-in-area':
			i = <ZoomInArea />;
			break;
		case 'ri-clipboard-copy':
			i = <ClipboardCopy />;
			break;
	}

	return (
		<IconContext.Provider value={{className: classes, style: style}}>
			{i}
		</IconContext.Provider>
	);
};

ReactIcon.propTypes = {
	icon: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
};

export default ReactIcon;
