document.addEventListener('DOMContentLoaded', () => {
  const categoryWrappers = document.querySelectorAll('.category-wrapper');

  categoryWrappers.forEach(wrapper => {
    const textBtn = wrapper.querySelector('.category-btn');
    const subList = wrapper.querySelector('.subcategory-list');

    if (!textBtn || !subList) return;

    // 기본적으로 숨김
    subList.style.display = 'none';
    subList.style.flexDirection = 'column';

    textBtn.addEventListener('click', () => {
      const isOpen = subList.classList.contains('show');

      // 다른 것들은 모두 닫음
      document.querySelectorAll('.subcategory-list').forEach(list => {
        list.classList.remove('show');
        list.style.display = 'none';
      });

      // 토글
      if (isOpen) {
        subList.classList.remove('show');
        subList.style.display = 'none';
      } else {
        subList.classList.add('show');
        subList.style.display = 'flex';
      }
    });
  });

  // 서브카테고리 링크 클릭 시 같은 창에서 열기
document.querySelectorAll('.subcategory-list a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    try {
      const href = link.getAttribute('href');
      const url = new URL(href, window.location.origin);
      const videoId = url.searchParams.get('video');
      if (videoId) {
        // 같은 창에서 이동
        window.location.href = `iframe.html?video=${videoId}`;
      }
    } catch (err) {
      console.error('링크가 잘못되었습니다:', link.href);
    }
  });
});
});
