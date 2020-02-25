document.querySelectorAll('#algorithms li.algorithm').forEach(li => {
    li.addEventListener('click', () => {
        document.querySelector('#algorithms li.algorithm.active').classList.remove('active');
        li.classList.add('active')
    })
})