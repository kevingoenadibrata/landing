import {
    faInstagram,
    faLinkedin,
    faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Airtable from 'airtable';
import { Button, Heading, Pane, Spinner, Text } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useParams } from 'react-router-dom';
import Badge from '../../components/Badge';

const Landing = () => {
    const params = useParams();
    const [record, setRecord] = useState({});
    const [photo, setPhoto] = useState('');
    const [photo2, setPhoto2] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageReady, setIsImageReady] = useState(false);
    const [isSpotifyReady, setIsSpotifyReady] = useState(false);
    const [isMapsReady, setIsMapsReady] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const callbackResponse = (err, rec) => {
        if (err || rec.length === 0) {
            console.error(err);
            return;
        }
        console.log(rec[0]);
        setRecord(rec[0].fields);
        setPhoto(rec[0].fields.photo[0].url);
        if (rec[0].fields.photo_secondary)
            setPhoto2(rec[0].fields.photo_secondary[0].url);
        setIsLoading(false);
        document.title = rec[0].fields.name;
    };

    const fetchData = async () => {
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
        });
        const base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE);
        const selectQuery = {
            filterByFormula: `SEARCH("${params.id}", {username})`
        };
        base('Table 1').select(selectQuery).firstPage(callbackResponse);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleWhatsappClick = () => {
        window.open(record?.whatsapp, '_blank');
    };

    const handleWebsiteClick = () => {
        window.open(record?.website, '_blank');
    };

    const handleInstagramClick = () => {
        window.open(
            `https://instagram.com/${record?.instagram_username}`,
            '_blank'
        );
    };

    const handleLinkedinClick = () => {
        window.open(
            `https://linkedin.com/in/${record?.linkedin_username}`,
            '_blank'
        );
    };

    const handleImageFlip = () => {
        if (!photo2) {
            setIsFlipped(false);
            return;
        }

        setIsFlipped(!isFlipped);
    };

    if (isLoading) {
        return (
            <Pane display="flex" justifyContent="center" marginTop={32}>
                <Spinner />
            </Pane>
        );
    }

    return (
        <Pane
            paddingTop={32}
            display="flex"
            width="100vw"
            alignItems="center"
            flexDirection="column"
        >
            <ReactCardFlip isFlipped={isFlipped}>
                <Pane
                    borderRadius={8}
                    overflow="hidden"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="250px"
                    height="250px"
                    elevation={2}
                    onClick={handleImageFlip}
                >
                    {!isImageReady && <Spinner position="absolute" />}
                    <Pane
                        opacity={isImageReady ? 1 : 0}
                        transitionDuration="1000ms"
                    >
                        <img
                            width="260px"
                            height="260px"
                            src={photo}
                            alt="profile"
                            onLoad={() => setIsImageReady(true)}
                        />
                    </Pane>
                </Pane>
                <Pane
                    borderRadius={8}
                    overflow="hidden"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="250px"
                    height="250px"
                    elevation={2}
                    onClick={handleImageFlip}
                >
                    <Pane>
                        <img
                            width="260px"
                            height="260px"
                            src={photo2}
                            alt="profile"
                        />
                    </Pane>
                </Pane>
            </ReactCardFlip>

            <Pane
                width="100vw"
                maxWidth="400px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding={32}
            >
                <Heading size={800} textAlign="center">
                    {record?.name}
                </Heading>
                <Text marginTop={16} textAlign="center">
                    {record?.description}
                </Text>
                <Text marginTop={16} textAlign="center">
                    {record?.description2}
                </Text>
                <Text marginTop={16} textAlign="center">
                    {record?.description3}
                </Text>
                <Pane
                    marginTop={32}
                    display="flex"
                    gap={8}
                    alignItems="center"
                    justifyContent="center"
                    flexWrap="wrap"
                >
                    {record.whatsapp && (
                        <Button
                            onClick={handleWhatsappClick}
                            appearance="primary"
                            intent="success"
                        >
                            <Pane marginRight={8}>
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </Pane>
                            Whatsapp
                        </Button>
                    )}

                    {record.instagram_username && (
                        <Button
                            onClick={handleInstagramClick}
                            appearance="instagram"
                        >
                            <Pane marginRight={8}>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Pane>
                            Instagram
                        </Button>
                    )}

                    {record.linkedin_username && (
                        <Button
                            onClick={handleLinkedinClick}
                            appearance="linkedin"
                        >
                            <Pane marginRight={8}>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Pane>
                            LinkedIn
                        </Button>
                    )}

                    {record.website && (
                        <Button onClick={handleWebsiteClick}>
                            <Pane marginRight={8}>
                                <FontAwesomeIcon icon={faGlobe} />
                            </Pane>
                            Website
                        </Button>
                    )}
                </Pane>
            </Pane>
            {record.spotify_id && (
                <Pane
                    marginTop={32}
                    width="100%"
                    maxWidth="600px"
                    padding={16}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {!isSpotifyReady && <Spinner />}
                    <Pane
                        opacity={isSpotifyReady ? 1 : 0}
                        transform={isSpotifyReady ? '' : 'translateY(50px)'}
                        transitionDuration="1000ms"
                        width="100%"
                    >
                        <iframe
                            onLoad={() => setIsSpotifyReady(true)}
                            style={{ borderRadius: '12px' }}
                            src={`https://open.spotify.com/embed/playlist/${record.spotify_id}?utm_source=generator`}
                            width="100%"
                            height="380"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            title="Spotify"
                        ></iframe>
                    </Pane>
                </Pane>
            )}

            {record.maps_query && (
                <Pane
                    marginTop={16}
                    width="100%"
                    maxWidth="600px"
                    padding={16}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {!isMapsReady && <Spinner />}
                    <Pane
                        opacity={isMapsReady ? 1 : 0}
                        transform={isMapsReady ? '' : 'translateY(50px)'}
                        transitionDuration="1000ms"
                        width="100%"
                    >
                        <iframe
                            onLoad={() => setIsMapsReady(true)}
                            width="100%"
                            height="380px"
                            frameborder="0"
                            style={{ border: 0, borderRadius: '12px' }}
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&q=${record.maps_query}`}
                            allowfullscreen
                            title="Google Maps"
                        ></iframe>
                    </Pane>
                </Pane>
            )}

            <Pane marginTop={32} marginBottom={32}>
                <Badge />
            </Pane>
        </Pane>
    );
};

export default Landing;
