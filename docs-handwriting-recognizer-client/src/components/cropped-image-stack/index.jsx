const CroppedImageStack = ({ basePhoto }) => {
    return (
        <div>
            <img
                src={basePhoto}
                alt="Selected prescription"
                style={{ width: '350px', height: '150px' }}
            />
            <img
                src={basePhoto}
                alt="Selected prescription"
                style={{ width: '350px', height: '150px' }}
            />
            <img
                src={basePhoto}
                alt="Selected prescription"
                style={{ width: '350px', height: '150px' }}
            />
            <img
                src={basePhoto}
                alt="Selected prescription"
                style={{ width: '350px', height: '150px' }}
            />
        </div>
    );
};

export default CroppedImageStack;
