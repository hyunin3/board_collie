import { IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';
import styled from 'styled-components';

/* 스타일 */
const InfoContainer = styled.span`
    display: flex;
    align-items: center;
`;
const infoIconStyle = {
    fontSize: '3.5vw',
    color: '#CCF38C'
};

function InfoComponent({info}) {

    return (
        <InfoContainer>
            <IconButton>
                <Info sx={{...infoIconStyle}}/>
            </IconButton>
        </InfoContainer>
    )
}

export default InfoComponent;