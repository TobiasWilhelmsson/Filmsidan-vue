<template>
  <footer>
    <p>&copy; 2023 Filmsidan. All data är från TMDb API.</p>
  </footer>
</template>

<style scoped>
footer {
  background: #222b31 !important;
  color: #c4dee5;
  text-align: center;
  padding: 12px 0;
  border-top: 3px solid #852d91;
  box-shadow: 0 -3px 11px 0px rgba(0, 0, 0, 0.5);
}

footer p {
  margin: 0;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0.7;
}

@media only screen and (max-width: 768px) {
  footer p {
    font-size: 12px;
  }
}
</style>
