import React from 'react'

const About = () => {
    return (
        <div className='section_about'>
            <div className='section_about_title'>
                <h4 className='about_title_main'>Truyen thong noi ve BookingCare</h4>
                <div className='about-title-video'>
                    <div className='content_left'>
                        <iframe 
                            width="100%" 
                            height="300" 
                            src="https://www.youtube.com/embed/snvqwUZO3XY" 
                            title="Có Quá Nhiều Siêu Nhân Trong Một Trận Chiến - Đại Chiến Siêu Anh Hùng" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>                    
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About