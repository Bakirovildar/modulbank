import './App.css';
import { useMachine } from '@xstate/react';
import { Modal, Button } from 'antd';
import { CaretRightFilled, ShrinkOutlined, PauseOutlined, ArrowsAltOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { videoPlayerMachine } from './state/index';
import ReactPlayer from 'react-player';

const VIDEO_URL = 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8';

function App() {
    const [state, send] = useMachine(videoPlayerMachine);

    const isPlaying = state.context.isPlaying;
    const isPlayerVisible = state.matches('opened');
    const isDefaultSize = state.matches({ opened: { size: 'default' } });

    const closePlayer = async () => {
        await send({ type: 'TOGGLE_PAUSED' });
        send({ type: 'CLOSE_PLAYER' });
    };

    const toggleScreenSize = () => {
        send(isDefaultSize ? { type: 'TOGGLE_MINI' } : { type: 'TOGGLE_DEFAULT' });
    };

    const togglePlayPause = () => {
        send(isPlaying ? { type: 'TOGGLE_PAUSED' } : { type: 'TOGGLE_PLAYING' });
    };

    const openPlayer = () => {
        send({ type: 'OPEN_PLAYER' })
    };

    return (
        <div className="App">
            {!isPlayerVisible && (
                <div className='closed-player'>
                    <PlayCircleOutlined className='player-icon' onClick={openPlayer} />
                </div>
            )}
            <Modal
                title="PLAYER"
                visible={isPlayerVisible}
                onCancel={closePlayer}
                className='opened-player'
                width={isDefaultSize ? 900 : 600}
                footer={[
                    <Button
                        key='size'
                        onClick={toggleScreenSize}
                        shape='circle'
                        icon={isDefaultSize ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
                    />,
                    <Button
                        key='pause'
                        onClick={togglePlayPause}
                        shape='circle'
                        icon={isPlaying ? <PauseOutlined /> : <CaretRightFilled />}
                    />,
                ]}
            >
                <ReactPlayer
                    url={VIDEO_URL}
                    playing={isPlaying}
                    width='100%'
                    height='100%'
                    loop={true}
                />
            </Modal>
        </div>
    );
}

export default App;