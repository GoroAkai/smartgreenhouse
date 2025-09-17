import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const GreenhouseSetup = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        const greenhouse = {
            id: uuidv4(),
            name,
        };
        // TODO: 保存処理（Amplify API or localStorage）
        navigate('/dashboard', { state: { greenhouse } });
    };

    return (
        <VStack spacing="4px" mt={10}>
            <Input
                placeholder="温室の名前を入力"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleRegister} colorScheme="teal">
                登録してセンサー一覧へ
            </Button>
        </VStack>
    );
};

export default GreenhouseSetup;