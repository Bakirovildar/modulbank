import './App.css';

import { Modal, Button } from 'antd';
import { ShrinkOutlined, PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';

import ReactPlayer from 'react-player';


function App() {
    return (
        <div className="App">
            <div className='player-modal'>
                <PlayCircleOutlined className='playing-icon' onClick={() => ''} />
            </div>
            <Modal
                title="PLAYER"
                style={{ margin: '5vh auto auto' }}
                width={900}
                footer={[
                    <Button
                        key='screen-size'
                        shape='circle'
                        icon={<ShrinkOutlined />}
                    />,
                    <Button
                        key='play-pause'
                        shape='circle'
                        icon={<PauseOutlined />}
                    />,
                ]}
            >
                <ReactPlayer
                    url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
                    width='100%'
                    height='100%'
                    loop={true}
                />
            </Modal>
        </div>
    );
}

export default App;
