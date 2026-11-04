<template>
  <span class="logo">
    <span class="logo-mark">
      <span class="w">W</span><span class="b">B</span><span class="m">M</span>
    </span>
    <span class="logo-sub">Waldemar Bohr Mobil</span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  flex-direction: column;
  line-height: 1;
}

.logo-mark {
  font-family: var(--ff-head);
  font-weight: 800;
  font-size: 38px;
  letter-spacing: -0.06em;
}

.w { color: var(--navy); }
.b { color: var(--blue); }
.m { color: var(--accent); }

.logo-sub {
  margin-top: 6px;
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--navy);
}
</style>