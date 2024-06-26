<?xml version="1.0" encoding="UTF-8"?>
<html lang="en" xsl:version="1.0">
<head>
    <title>Сеть супермаркетов</title>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="C:\labs\IR\css\input.css">
</head>
<body>
<header class="head">
            <a href="Project.html"><img class="storename" src="Название магазина.svg"></a>
            <a href="can.html"><div class="butons">Корзина</div></a> 
            <a href="personalAccount.html"><div class="butons">Личный кабинет</div></a>
            <a href="goods.html"><div class="butons">Товары</div></a>
        </header>
        <header class="head1">
            <div class="sidenav">
                <button class="dropdown-btn">Меню
                </button>
                <div class="dropdown-container">
                    <a href="goods.html">Товары</a>
                    <a href="personalAccount.html">Личный кабинет</a>
                    <a href="can.html">Корзина</a> 
                </div>
              </div>
        </header>
        <main class="main">
            <h2>Нынешние вакансии</h2>
<xsl:for-each select="jobs_menu/job">
    <p><xsl:value-of select="job_name"/></p>
    <p><xsl:value-of select="job_description"/></p>
</xsl:for-each>
</main>
<footer class="foot">
            <div class="fdiv">
                <div class="ftext2">
                    <p>ВЫ МОЖЕТЕ НАЙТИ НАС:</p>
                    <img class="image" src="VK.com-logo.svg"> Вконтакте
                </div>
                <div class="ftext1">
                <p>СОТРУДНИЧЕСТВО</p>
                <a class="col" href="jobs.html">Вакансии</a>
                </div>
                
            </div>
            </footer>
            <script type="text/javascript" src="search.js"></script>
            <script>
                var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;
        
        for (i = 0; i < dropdown.length; i++) {
          dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
            } else {
              dropdownContent.style.display = "block";
            }
          });
        }
            </script>
</body>
</html>