import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistComicOneDetail = () => {
    const [comicBodyId, setComicBodyId] = useState(null); 
    const [comicDetails, setComicDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
       

        const storedComicBodyId = localStorage.getItem('comicBodyId');
        if (storedComicBodyId) {
            setComicBodyId(storedComicBodyId);
        } else {
            setError('잘못된 접근입니다.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchComicDetails = async () => {
            if (comicBodyId) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/artist/comic/content/${comicBodyId}`, {
                        withCredentials: true
                    });
                    setComicDetails(response.data);
                } catch (err) {
                    setError('연재작품 상세 정보를 불러오는 데 실패했습니다.');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchComicDetails();
    }, [comicBodyId]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            {comicDetails && (
                <>
                   
                    {comicDetails.imageUrls && comicDetails.imageUrls.length > 0 ? (
                        <div>
                            {comicDetails.imageUrls.map((url, index) => (
                                <img key={index} src={url} alt={`comic-image-${index}`} />
                            ))}
                        </div>
                    ) : (
                        <p>이미지가 없습니다.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ArtistComicOneDetail;
