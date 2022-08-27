import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Airtable from 'airtable';
import { Button, Heading, Pane, Spinner, Text } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Badge from '../../components/Badge';

const Landing = () => {
    const params = useParams();
    const [record, setRecord] = useState({});
    const [photo, setPhoto] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isImageReady, setIsImageReady] = useState(false);

    const callbackResponse = (err, rec) => {
        if (err || rec.length === 0) {
            console.error(err);
            return;
        }
        setRecord(rec[0].fields);
        setPhoto(rec[0].fields.photo[0].url);
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

    if (isLoading) {
        return (
            <Pane display="flex" justifyContent="center" marginTop={32}>
                <Spinner />
            </Pane>
        );
    }

    return (
        <Pane
            padding={32}
            display="flex"
            width="100vw"
            alignItems="center"
            flexDirection="column"
        >
            <Pane
                borderRadius={8}
                overflow="hidden"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="250px"
                height="250px"
                elevation={2}
                marginTop={16}
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
                    marginTop={16}
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
            <Badge />
        </Pane>
    );
};

export default Landing;
