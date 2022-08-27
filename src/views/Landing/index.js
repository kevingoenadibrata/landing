import Airtable from 'airtable';
import { Heading, Pane, Text } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Landing = () => {
    const params = useParams();
    const [record, setRecord] = useState({});
    const [photo, setPhoto] = useState('');

    const callbackResponse = (err, rec) => {
        if (err) {
            console.error(err);
            return;
        }
        setRecord(rec.fields);
        setPhoto(rec.fields.photo[0].url);
    };

    const fetchData = async () => {
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
        });
        const base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE);
        base('Table 1').find(params.id, callbackResponse);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                marginBottom={32}
            >
                <img width="250px" src={photo} />
            </Pane>

            <Pane
                width="100vw"
                maxWidth="400px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Heading size={900} textAlign="center">
                    {record?.name}
                </Heading>
                <Text marginTop={8} textAlign="center">
                    {record?.description}
                </Text>
                <Text marginTop={8} textAlign="center">
                    {record?.description2}
                </Text>
                <Text marginTop={8} textAlign="center">
                    {record?.description3}
                </Text>
            </Pane>
        </Pane>
    );
};

export default Landing;
