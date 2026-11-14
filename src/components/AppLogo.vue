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
  font-weight: 700;
  font-size: 40px;
  letter-spacing: -0.01em;
}

.w,
.b { color: var(--navy); }
.m { color: var(--accent); }

.logo-sub {
  margin-top: 7px;
  font-family: var(--ff-body);
  font-weight: 600;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
}
</style>