// ✅ 공통 효과 함수
export function playSuccessEffect(message = '🎉 성공!') {
    const container = document.createElement('div');
    container.textContent = message;
    Object.assign(container.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.95)',
        border: '3px solid #4ade80',
        borderRadius: '12px',
        padding: '20px 40px',
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#16a34a',
        zIndex: '9999',
        opacity: '1',
        animation: 'fadeInOut 2s ease-in-out',
    });
    container.classList.add('animate-pop');

    document.body.appendChild(container);

    setTimeout(() => {
        document.body.removeChild(container);
    }, 2000);
}