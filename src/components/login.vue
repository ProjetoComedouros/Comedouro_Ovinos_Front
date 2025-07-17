<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>LoginPage</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
</head>

<body>
  <div class="login-container">
    <h2 class="login-title">Login</h2>

    <!-- FORMULÁRIO APENAS VISUAL -->
    import loginform from '/components/login/loginForm.vue';
  </div>

  <style>
    body {
      background-color: #f5f5f5;
      font-family: "Segoe UI", sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .login-container {
      background: #fff;
      padding: 2rem 2.5rem;
      border-radius: 16px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
      width: 100%;
      max-width: 400px;
    }

    .login-title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-weight: 600;
      font-size: 1.5rem;
      color: #333;
    }
  </style>
</body>
</html>