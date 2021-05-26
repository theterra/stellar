import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { css } from '@emotion/core';
import { Box, Button } from '@stellar/components';
import { GET_TICKET } from 'Queries/getTicket';

const style = css`
    color: #fff;
    height: '100vh';
`;

const AdminPage = () => {
    const { loading, error, data } = useQuery(GET_TICKET, {
        variables: {
            id: 12,
        },
    });

    const [count, setCount] = React.useState(0);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div css={style}>
            <Box
                m={3}
                p={2}
                bg="navy"
                style={{
                    fontSize: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                }}
            >
                <div onClick={() => setCount((prev) => prev + 1)} role="button" tabIndex="-1">
                    Hello, John! &nbsp;
                    <span role="img" aria-label="emoji">
                        🤯
                    </span>
                </div>
                <div style={{ fontSize: '0.8rem' }}>
                    {data.ticket.content} - {count}
                </div>
                <Button variant="primary">Click me!</Button>
            </Box>
        </div>
    );
};

export default AdminPage;
