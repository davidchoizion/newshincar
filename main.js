const form = document.getElementById('partner-form');
const note = document.getElementById('form-note');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    submitBtn.disabled = true;
    note.textContent = '전송 중입니다. 잠시만 기다려 주세요.';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.reset();
            note.textContent = '문의가 정상적으로 접수되었습니다. 곧 연락드리겠습니다.';
        } else {
            note.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        }
    } catch (error) {
        note.textContent = '네트워크 오류가 발생했습니다. 연결 상태를 확인해 주세요.';
    } finally {
        submitBtn.disabled = false;
    }
});
