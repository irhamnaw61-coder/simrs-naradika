/* ========================================== */
/* SCRIPT UTUH & SINKRON DENGAN HTML BARU     */
/* ========================================== */

function prosesLogin() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    
    if(user.trim() !== "" && pass.trim() !== "") {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardView').style.display = 'block';
    } else {
        alert('Masukkan Username dan Password!');
    }
}

function logoutSistem() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('registrasiModule').classList.remove('active');
}

// Data Master Dokter Spesialis
const daftarDokter = [
    { kode: "DR-001", nama: "dr. Hilyantul, Sp.A", spesialisasi: "Spesialis Anak", jk: "L" },
    { kode: "DR-002", nama: "dr. Hilyatul Nadia, Sp.OG", spesialisasi: "Spesialis Obstetri & Ginekologi", jk: "P" },
    { kode: "DR-003", nama: "dr. Siti Rahmawati, Sp.PD", spesialisasi: "Spesialis Penyakit Dalam", jk: "P" },
    { kode: "DR-004", nama: "dr. Budi Santoso, Sp.B", spesialisasi: "Spesialis Bedah Umum", jk: "L" },
    { kode: "DR-005", nama: "dr. Ahmad Fauzi, Sp.N", spesialisasi: "Spesialis Neurologi (Saraf)", jk: "L" },
    { kode: "DR-006", nama: "dr. Maya Anggraini, Sp.M", spesialisasi: "Spesialis Mata", jk: "P" },
    { kode: "DR-007", nama: "dr. Hendra Wijaya, Sp.THT-KL", spesialisasi: "Spesialis THT-KL", jk: "L" },
    { kode: "DR-008", nama: "dr. Ratna Kartika, Sp.KK", spesialisasi: "Spesialis Kulit & Kelamin", jk: "P" },
    { kode: "DR-009", nama: "dr. Eko Prasetyo, Sp.JP", spesialisasi: "Spesialis Jantung & Pembuluh Darah", jk: "L" },
    { kode: "DR-010", nama: "dr. Dian Sastrowardoyo, Sp.KJ", spesialisasi: "Spesialis Kedokteran Jiwa", jk: "P" }
];

// Data Master Unit / Poliklinik
const daftarUnit = [
    { kode: "U0001", nama: "Poliklinik Spesialis Anak", baru: 45, lama: 120 },
    { kode: "U0002", nama: "Poliklinik Kebidanan & Kandungan (OG)", baru: 38, lama: 150 },
    { kode: "U0003", nama: "Poliklinik Penyakit Dalam", baru: 52, lama: 210 },
    { kode: "U0004", nama: "Poliklinik Bedah Umum", baru: 25, lama: 85 },
    { kode: "U0005", nama: "Poliklinik Syaraf (Neurologi)", baru: 30, lama: 95 },
    { kode: "U0006", nama: "Poliklinik Mata", baru: 20, lama: 70 },
    { kode: "U0007", nama: "Poliklinik THT-KL", baru: 22, lama: 65 },
    { kode: "U0008", nama: "Poliklinik Kulit & Kelamin", baru: 28, lama: 75 },
    { kode: "U0009", nama: "Poliklinik Jantung", baru: 35, lama: 140 },
    { kode: "U0010", nama: "Poliklinik Gigi & Mulut", baru: 40, lama: 110 },
    { kode: "U0011", nama: "Poliklinik jiwa", baru: 38, lama: 120 }
];

// LocalStorage Database Management
function getDatabasePasien() {
    let data = localStorage.getItem('simrs_pasien_db');
    if(!data) {
        let defaultPasien = [
            {
                rm: "00022", nama: "Andi Budiman", ktp: "423847243", jk: "LAKI-LAKI", tmpLahir: "Merauke", tglLahir: "1993-08-07", 
                ibu: "Susi Budiman", alamat: "Jl. Sawangan, Kec. Cilandak, Kab. Jakarta Selatan", gd: "B", pekerjaan: "Swasta", 
                nikah: "MENIKAH", agama: "ISLAM", tglDaftar: "05-08-2026", telp: "084324878243", pendidikan: "S1", 
                asuransi: "BPJS KESEHATAN", peserta: "8237423487988", pjPekerjaan: "Swasta", alamatPJ: "Jl. Sawangan, Cilandak"
            }
        ];
        localStorage.setItem('simrs_pasien_db', JSON.stringify(defaultPasien));
        return defaultPasien;
    }
    return JSON.parse(data);
}

function getDatabaseReg() {
    let data = localStorage.getItem('simrs_reg_db');
    if(!data) {
        let defaultReg = [];
        localStorage.setItem('simrs_reg_db', JSON.stringify(defaultReg));
        return defaultReg;
    }
    return JSON.parse(data);
}

// Navigasi Tampilan Utama & Modul
function goHome() {
    document.getElementById('dashboardView').style.display = 'block';
    document.getElementById('registrasiModule').classList.remove('active');
}

function openRegistrasiModule() {
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('registrasiModule').classList.add('active');
    muatDropdownFilterReg();
    muatTabelRegistrasiHarian();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openModalDokter() {
    let tbody = document.getElementById('tabelDokterBody');
    tbody.innerHTML = '';
    daftarDokter.forEach(doc => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${doc.kode}</td><td>${doc.nama}</td><td>${doc.spesialisasi}</td><td>${doc.jk}</td>`;
        tr.onclick = function() {
            document.getElementById('regDokter').value = doc.kode;
            document.getElementById('regDokterNama').value = doc.nama;
            closeModal('modalDokter');
        };
        tbody.appendChild(tr);
    });
    document.getElementById('modalDokter').style.display = 'flex';
}

function openModalUnit() {
    let tbody = document.getElementById('tabelUnitBody');
    tbody.innerHTML = '';
    daftarUnit.forEach(u => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${u.kode}</td><td>${u.nama}</td><td>${u.baru}</td><td>${u.lama}</td>`;
        tr.onclick = function() {
            document.getElementById('regUnit').value = u.kode;
            document.getElementById('regUnitNama').value = u.nama;
            closeModal('modalUnit');
        };
        tbody.appendChild(tr);
    });
    document.getElementById('modalUnit').style.display = 'flex';
}

function openModalPasienMaster() {
    muatDataPasienTabel();
    document.getElementById('modalPasienMaster').style.display = 'flex';
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if(tabId === 'tabInput') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('tabInput').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('tabData').classList.add('active');
        muatDataPasienTabel();
    }
}

function togglePjInput() {
    let selected = document.querySelector('input[name="pjOpsi"]:checked').value;
    let inputPJ = document.getElementById('inputNamaPJ');
    if(selected === 'Ayah') inputPJ.value = "Ayah Kandung";
    else if(selected === 'Ibu') inputPJ.value = "Ibu Kandung";
    else inputPJ.value = "";
}

function salinAlamat() {
    let chk = document.getElementById('checkSamaAlamat');
    let jalan = document.getElementById('inputAlamatJalan').value;
    let kec = document.getElementById('inputKecamatan').value;
    let kab = document.getElementById('inputKabupaten').value;
    if(chk.checked) {
        document.getElementById('inputAlamatPJText').value = jalan + ", Kec. " + kec + ", Kab. " + kab;
    } else {
        document.getElementById('inputAlamatPJText').value = "";
    }
}

// Simpan Pasien Baru ke Master
function simpanPasienBaru() {
    let nama = document.getElementById('inputNama').value;
    if(!nama) {
        alert('Nama pasien wajib diisi!');
        return;
    }

    let databasePasien = getDatabasePasien();
    let nextRm = String(Number(databasePasien[databasePasien.length - 1].rm) + 1).padStart(5, '0');

    let jalan = document.getElementById('inputAlamatJalan').value;
    let kec = document.getElementById('inputKecamatan').value;
    let kab = document.getElementById('inputKabupaten').value;
    let alamatLengkap = jalan + (kec ? ", Kec. " + kec : "") + (kab ? ", Kab/Kota " + kab : "");

    let pasienBaru = {
        rm: nextRm,
        nama: nama,
        ktp: document.getElementById('inputKTP').value,
        jk: document.getElementById('inputJK').value,
        tmpLahir: document.getElementById('inputTmpLahir').value,
        tglLahir: document.getElementById('inputTglLahir').value,
        ibu: document.getElementById('inputIbu').value,
        pjNama: document.getElementById('inputNamaPJ').value,
        alamat: alamatLengkap,
        gd: document.getElementById('inputGD').value,
        pekerjaan: "Swasta",
        nikah: document.getElementById('inputNikah').value,
        agama: document.getElementById('inputAgama').value,
        tglDaftar: "05-08-2026",
        telp: document.getElementById('inputTelp').value,
        pendidikan: document.getElementById('inputPendidikan').value,
        asuransi: document.getElementById('inputAskes').value,
        peserta: document.getElementById('inputNoPeserta').value,
        pjPekerjaan: "Swasta",
        alamatPJ: document.getElementById('inputAlamatPJText').value
    };

    databasePasien.push(pasienBaru);
    localStorage.setItem('simrs_pasien_db', JSON.stringify(databasePasien));
    alert('Data Pasien Baru Berhasil Disimpan Secara Permanen!');
    switchTab('tabData');
}

function muatDataPasienTabel() {
    let databasePasien = getDatabasePasien();
    let tbody = document.getElementById('tabelMasterPasienBody');
    if(!tbody) return;
    tbody.innerHTML = '';

    databasePasien.forEach((p, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" checked></td>
            <td style="text-align: center; white-space: nowrap;">
                <button class="btn-action btn-ganti" style="padding: 2px 6px; font-size: 10px;" onclick="ubahDataPasien(${index})">Ubah</button>
                <button class="btn-action btn-hapus" style="padding: 2px 6px; font-size: 10px;" onclick="hapusDataPasien(${index})">Hapus</button>
            </td>
            <td>${p.rm}</td>
            <td>${p.nama}</td>
            <td>${p.ktp}</td>
            <td>${p.jk}</td>
            <td>${p.tmpLahir}</td>
            <td>${p.tglLahir}</td>
            <td>${p.ibu}</td>
            <td>${p.alamat}</td>
            <td>${p.gd}</td>
            <td>${p.pekerjaan}</td>
            <td>${p.nikah}</td>
            <td>${p.agama}</td>
            <td>${p.tglDaftar}</td>
            <td>${p.telp}</td>
            <td>${p.pendidikan}</td>
            <td>${p.asuransi}</td>
            <td>${p.peserta}</td>
            <td>${p.pjPekerjaan}</td>
            <td>${p.alamatPJ}</td>
        `;
        
        // Double click tetap berfungsi untuk memasukkan ke form registrasi
        tr.ondblclick = function(e) {
            if(e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
            document.getElementById('regRM').value = p.rm;
            document.getElementById('regNamaPasien').value = p.nama;
            document.getElementById('regPJ').value = p.pjNama || p.ibu || "-";
            document.getElementById('regAlamatPJ').value = p.alamatPJ;
            
            if(p.tglLahir) {
                let tahunLahir = new Date(p.tglLahir).getFullYear();
                let tahunSekarang = new Date().getFullYear();
                let hitungUmur = (tahunSekarang - tahunLahir) + " Th";
                let inputUmur = document.getElementById('regUmur');
                if(inputUmur) inputUmur.value = hitungUmur;
            }
            closeModal('modalPasienMaster');
        };
        
        tbody.appendChild(tr);
    });
}


function filterTabelPasien() {
    let keyword = document.getElementById('keywordPasien').value.toLowerCase();
    let rows = document.querySelectorAll('#tabelMasterPasienBody tr');
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(keyword) ? '' : 'none';
    });
}

// Registrasi Periksa Harian
function simpanRegistrasi() {
    let rm = document.getElementById('regRM').value;
    let nama = document.getElementById('regNamaPasien').value;
    let dokter = document.getElementById('regDokterNama').value;
    let kodeDokter = document.getElementById('regDokter').value;
    let unit = document.getElementById('regUnitNama').value;

    if(!rm || !nama) {
        alert('Silakan pilih No. Rekam Medis terlebih dahulu dari master pasien!');
        return;
    }

    let databaseReg = getDatabaseReg();
    let regBaru = {
        reg: String(databaseReg.length + 1).padStart(3, '0'),
        rawat: "2026/08/05/000" + String(databaseReg.length + 1).padStart(2, '0'),
        tanggal: "05-08-2026",
        jam: "12:54:31",
        kodedokter: document.getElementById('regDokter') ? document.getElementById('regDokter').value : "",
        dokter: document.getElementById('regDokterNama') ? document.getElementById('regDokterNama').value : "",
        rm: rm,
        pasien: nama,
        jk: "L",
        umur: document.getElementById('regUmur') && document.getElementById('regUmur').value ? document.getElementById('regUmur').value : "0 Th",
        poli: unit,
        bayar: document.getElementById('regJenisBayarKode').value,
        pj: document.getElementById('regPJ').value
    };

    databaseReg.push(regBaru);
    localStorage.setItem('simrs_reg_db', JSON.stringify(databaseReg));
    muatTabelRegistrasiHarian();
    alert('Registrasi periksa hari ini berhasil disimpan!');
}

function muatTabelRegistrasiHarian() {
    let databaseReg = getDatabaseReg();
    let keyword = document.getElementById('searchKeywordReg') ? document.getElementById('searchKeywordReg').value.toLowerCase() : "";
    let filterDoc = document.getElementById('filterDokterReg') ? document.getElementById('filterDokterReg').value : "";
    let filterUn = document.getElementById('filterUnitReg') ? document.getElementById('filterUnitReg').value : "";

    let tbody = document.querySelector('#tabelRegistrasiHarian tbody');
    if(!tbody) return;
    tbody.innerHTML = '';

    let count = 0;
    databaseReg.forEach((r, index) => {
        if(keyword && !r.pasien.toLowerCase().includes(keyword) && !r.rm.includes(keyword)) return;
        if(filterDoc && r.kodedokter !== filterDoc) return;
        if(filterUn && r.poli !== filterUn) return;

        count++;
        let tr = document.createElement('tr');
        tr.setAttribute('data-index', index);
        tr.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" checked></td>
            <td>${r.reg}</td>
            <td>${r.rawat}</td>
            <td>${r.tanggal}</td>
            <td>${r.jam}</td>
            <td>${r.kodedokter}</td>
            <td>${r.dokter}</td>
            <td>${r.rm}</td>
            <td>${r.pasien}</td>
            <td>${r.jk}</td>
            <td>${r.umur}</td>
            <td>${r.poli}</td>
            <td>${r.bayar}</td>
            <td>${r.pj}</td>
        `;
        
        tr.onclick = function(e) {
            if(e.target.tagName === 'INPUT') return;
            document.getElementById('regRM').value = r.rm;
            document.getElementById('regNamaPasien').value = r.pasien;
            document.getElementById('regPJ').value = r.pj;
            document.getElementById('regDokter').value = r.kodedokter;
            document.getElementById('regDokterNama').value = r.dokter;
            document.getElementById('regUnitNama').value = r.poli;
        };

        tbody.appendChild(tr);
    });
    
    if(document.getElementById('recordCount')) {
        document.getElementById('recordCount').innerText = count;
    }
}

function filterTabelRegistrasi() {
    muatTabelRegistrasiHarian();
}

function muatDropdownFilterReg() {
    let docSelect = document.getElementById('filterDokterReg');
    if(docSelect && docSelect.options.length <= 1) {
        docSelect.innerHTML = '<option value="">Semua Dokter</option>';
        daftarDokter.forEach(d => {
            let opt = document.createElement('option');
            opt.value = d.kode;
            opt.text = d.nama;
            docSelect.add(opt);
        });
    }

    let unitSelect = document.getElementById('filterUnitReg');
    if(unitSelect && unitSelect.options.length <= 1) {
        unitSelect.innerHTML = '<option value="">Semua Unit</option>';
        daftarUnit.forEach(u => {
            let opt = document.createElement('option');
            opt.value = u.nama;
            opt.text = u.nama;
            unitSelect.add(opt);
        });
    }
}

function formBaruRegistrasi() {
    document.getElementById('regRM').value = "";
    document.getElementById('regNamaPasien').value = "";
    document.getElementById('regPJ').value = "";
    document.getElementById('regDokter').value = "";
    document.getElementById('regDokterNama').value = "";
    document.getElementById('regUnit').value = "";
    document.getElementById('regUnitNama').value = "";

    // Tambahkan baris dinamis ini di sini:
    let d = new Date();
    let thn = d.getFullYear();
    let bln = String(d.getMonth() + 1).padStart(2, '0');
    let tgl = String(d.getDate()).padStart(2, '0');

    document.getElementById('regNoRawat').value = `${thn}/${bln}/${tgl}/00001`;
    document.getElementById('regTgl').value = `${tgl}-${bln}-${thn}`;
    
}

function hapusRegistrasi() {
    let databaseReg = getDatabaseReg();
    let rows = document.querySelectorAll('#tabelRegistrasiHarian tbody tr');
    let newDb = [];
    
    rows.forEach((tr) => {
        let chk = tr.querySelector('.row-checkbox');
        let index = tr.getAttribute('data-index');
        if(!chk || !chk.checked) {
            newDb.push(databaseReg[index]);
        }
    });

    if(newDb.length === databaseReg.length) {
        alert("Pilih baris data yang ingin dihapus dengan mencentang kotak di kolom paling kiri tabel!");
        return;
    }

    if(confirm("Yakin ingin menghapus data registrasi yang dipilih?")) {
        localStorage.setItem('simrs_reg_db', JSON.stringify(newDb));
        muatTabelRegistrasiHarian();
        alert("Data berhasil dihapus.");
    }
}

function gantiRegistrasi() {
    let rm = document.getElementById('regRM').value;
    if(!rm) {
        alert("Pilih data pada tabel terlebih dahulu untuk diganti/diupdate!");
        return;
    }

    let databaseReg = getDatabaseReg();
    let found = databaseReg.find(r => r.rm === rm);
    if(found) {
        found.dokter = document.getElementById('regDokterNama').value;
        found.kodedokter = document.getElementById('regDokter').value;
        found.poli = document.getElementById('regUnitNama').value;
        found.pj = document.getElementById('regPJ').value;

        localStorage.setItem('simrs_reg_db', JSON.stringify(databaseReg));
        muatTabelRegistrasiHarian();
        alert("Data registrasi berhasil diperbarui (diganti)!");
    } else {
        alert("Data tidak ditemukan di database.");
    }
}

function cetakRegistrasi() {
    window.print();
}

function muatSemuaRegistrasi() {
    if(document.getElementById('searchKeywordReg')) document.getElementById('searchKeywordReg').value = "";
    if(document.getElementById('filterDokterReg')) document.getElementById('filterDokterReg').value = "";
    if(document.getElementById('filterUnitReg')) document.getElementById('filterUnitReg').value = "";
    muatTabelRegistrasiHarian();
}

// Fungsi Membuka Modul Rawat Jalan
function openRawatJalanModule() {
    const db = document.getElementById('dashboardView');
    const reg = document.getElementById('registrasiModule');
    const rj = document.getElementById('rawatJalanModule');
    
    if(db) db.style.display = 'none';
    if(reg) reg.style.display = 'none';
    if(rj) rj.style.display = 'block';
}

// Navigasi Sidebar di dalam Rawat Jalan
function switchRJTab(target) {
    const riwayat = document.getElementById('rjPanelRiwayat');
    const pemeriksaan = document.getElementById('rjPanelPemeriksaan');
    
    if(target === 'riwayat') {
        riwayat.style.display = 'flex';
        pemeriksaan.style.display = 'none';
    } else if(target === 'pemeriksaanRuang') {
        riwayat.style.display = 'none';
        pemeriksaan.style.display = 'flex';
    }
}



// Navigasi Antar Modul Utama (Mencegah Tombol Mandek / Freeze)
function goHome() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    if(db) db.style.display = 'block';
    if(reg) reg.style.display = 'none';
    if(rj) rj.style.display = 'none';
    document.getElementById('ruangPemeriksaanModal').style.display = 'none';
}

function openRegistrasiModule() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    if(db) db.style.display = 'none';
    if(reg) reg.style.display = 'block';
    if(rj) rj.style.display = 'none';
    document.getElementById('ruangPemeriksaanModal').style.display = 'none';
    muatDropdownFilterReg();
    muatTabelRegistrasiHarian();
}

function openRawatJalanModule() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    if(db) db.style.display = 'none';
    if(reg) reg.style.display = 'none';
    if(rj) rj.style.display = 'flex';
}

// Fungsi Buka / Tutup Ruang Pemeriksaan saat Pasien di-Double Click
function bukaRuangPemeriksaan(noRawat, rm, nama) {
    let modal = document.getElementById('ruangPemeriksaanModal');
    if(modal) modal.style.display = 'flex';

    // TAMBAHKAN BARIS INI BIAR OTOMATIS KE TAB PENANANGAN DOKTER
    if(typeof switchSubRJTab === 'function') {
        let btnDokter = document.querySelector('.rj-content-area .rj-tab-header button');
        if(btnDokter) switchSubRJTab('rp-sub-penangananDokter', btnDokter);
    }

    let allInputs = document.querySelectorAll('#ruangPemeriksaanModal input[type="text"]');
    if(allInputs.length >= 3) {
        allInputs[0].value = noRawat;
        allInputs[1].value = rm;
        allInputs[2].value = nama;
    }
}

// Fungsi untuk memilih dokter dari modal dan memasukkannya ke form utama
function pilihDokter(kodeDokter, namaDokter) {
    // Cek otomatis apakah kotak input registrasi ada di layar
    let regKode = document.getElementById('regDokter');
    
    if (regKode && regKode.offsetParent !== null) {
        // Jika ya, masukkan ke form Registrasi
        regKode.value = kodeDokter;
        let regNama = document.getElementById('regDokterNama');
        if (regNama) regNama.value = namaDokter;
    } else {
        // Jika tidak, masukkan ke form Rawat Jalan
        let inputKode = document.getElementById('rpKodeDokter');
        let inputNama = document.getElementById('rpNamaDokter');
        if (inputKode) inputKode.value = kodeDokter;
        if (inputNama) inputNama.value = namaDokter;
    }

    // Tutup modal dokter setelah dipilih
    let modalDokter = document.getElementById('modalDokter');
    if (modalDokter) modalDokter.style.display = 'none';
}



function tutupRuangPemeriksaan() {
    document.getElementById('ruangPemeriksaanModal').style.display = 'none';
}

// Navigasi Sub-Tab Horizontal di dalam Ruang Pemeriksaan (Fix Utama)
function switchSubRJTab(subId, btnElement) {
    // 1. Sembunyikan semua konten sub-tab yang ada di dalam ruang pemeriksaan
    const contents = document.querySelectorAll('.rp-sub-tab-content, .sub-tab-content');
    contents.forEach(c => {
        c.style.display = 'none';
    });

    // 2. Cari target berdasarkan ID asli di HTML (mendukung format dengan atau tanpa 'sub-')
    let targetEl = document.getElementById(subId);
    if (!targetEl) {
        targetEl = document.getElementById('sub-' + subId);
    }

    // 3. Jika ketemu, tampilkan dengan format flex/block yang sesuai
    if (targetEl) {
        targetEl.style.display = 'flex';
        targetEl.style.flexDirection = 'column';
    }

    // 4. Pindahkan class 'active' pada tombol tab
    if (btnElement && btnElement.parentElement) {
        const buttons = btnElement.parentElement.querySelectorAll('button');
        buttons.forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
}


// Fungsi Helper untuk Mereset & Mengaktifkan Tombol Toolbar
function setAktifToolbar(namaTombol) {
    // Hapus class active-menu dari semua tombol di sub-toolbar
    const semuaTombol = document.querySelectorAll('.sub-toolbar .toolbar-item');
    semuaTombol.forEach(btn => btn.classList.remove('active-menu'));

    // Cari tombol yang diklik berdasarkan teks atau atribut, lalu aktifkan
    semuaTombol.forEach(btn => {
        if(btn.innerText.includes(namaTombol)) {
            btn.classList.add('active-menu');
        }
    });
}

// Modifikasi Fungsi Navigasi Utama
function openRegistrasiModule() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    
    if(db) db.style.display = 'none';
    if(reg) reg.style.display = 'block';
    if(rj) rj.style.display = 'none';
    
    setAktifToolbar('Registrasi'); // Tombol Registrasi jadi aktif terkunci
    muatDropdownFilterReg();
    muatTabelRegistrasiHarian();
}

function openRawatJalanModule() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    
    if(db) db.style.display = 'none';
    if(reg) reg.style.display = 'none';
    if(rj) rj.style.display = 'flex'; // atau 'block' tergantung struktur lu
    
    setAktifToolbar('Rawat Jalan'); // Tombol Rawat Jalan jadi aktif terkunci
}

function goHome() {
    let db = document.getElementById('dashboardView');
    let reg = document.getElementById('registrasiModule');
    let rj = document.getElementById('rawatJalanModule');
    
    if(db) db.style.display = 'block';
    if(reg) reg.style.display = 'none';
    if(rj) rj.style.display = 'none';
    
    // Reset semua tombol toolbar karena kembali ke beranda/menu utama
    const semuaTombol = document.querySelectorAll('.sub-toolbar .toolbar-item');
    semuaTombol.forEach(btn => btn.classList.remove('active-menu'));
}

// Data Master Tindakan Dokter Lengkap (14 Baris sesuai Referensi Asli)
const daftarMasterTindakan = [
    { kode: "J0000789", nama: "Administrasi", kategori: "Dokter Umum", tarif: "90,000" },
    { kode: "J0000829", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000834", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000851", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "POLI PENYAKIT DALAM", tarif: "75,000" },
    { kode: "J0000828", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000833", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "30,000" },
    { kode: "J0000838", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000827", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000832", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000837", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000826", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000831", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000836", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "30,000" },
    { kode: "J0000825", nama: "Administrasi Asuransi / Pihak ke - III", kategori: "Dokter Umum", tarif: "75,000" },
    { kode: "J0000614", nama: "RJP (Resusitasi Jantung Paru)", kategori: "Tindakan Medis", tarif: "250,000" }
];

// Inisialisasi Tabel Tindakan saat Halaman Dimuat
function muatTabelMasterTindakan() {
    let tbody = document.getElementById('bodyMasterTindakan');
    if(!tbody) return;
    tbody.innerHTML = '';
    daftarMasterTindakan.forEach((t, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="tindakan-checkbox" data-index="${index}"></td>
            <td>${t.kode}</td>
            <td>${t.nama}</td>
            <td>${t.kategori}</td>
            <td>${t.tarif}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Panggil fungsi saat jendela ruang pemeriksaan dibuka
const oldBukaRuangPemeriksaan = window.bukaRuangPemeriksaan || function(){};
window.bukaRuangPemeriksaan = function(noRawat, rm, nama) {
    let modal = document.getElementById('ruangPemeriksaanModal');
    if(modal) modal.style.display = 'flex';
    muatTabelMasterTindakan();
};

// Perbaikan Klik Pilih Dokter dari Pop-Up (Supaya Langsung Masuk ke Input)
function openModalDokter() {
    let tbody = document.getElementById('tabelDokterBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    daftarDokter.forEach(doc => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${doc.kode}</td>
            <td>${doc.nama}</td>
            <td>${doc.spesialisasi}</td>
        `;
        
        // Langsung panggil fungsi pilihDokter yang sudah kita buat sebelumnya
        tr.onclick = function() {
            pilihDokter(doc.kode, doc.nama);
        };
        
        tbody.appendChild(tr);
    });

    let modal = document.getElementById('modalDokter');
    if(modal) modal.style.display = 'flex';
}
    
   
// Navigasi Sub-Tab di dalam Penanganan Dokter (Tagihan vs Tindakan Dilakukan)
function switchDpTab(targetTab, btnElement) {
    let tabTagihan = document.getElementById('dp-content-tagihan');
    let tabDilakukan = document.getElementById('dp-content-dilakukan');
    
    if(targetTab === 'tagihan') {
        tabTagihan.style.display = 'flex';
        tabDilakukan.style.display = 'none';
    } else {
        tabTagihan.style.display = 'none';
        tabDilakukan.style.display = 'flex';
    }

    let buttons = btnElement.parentElement.querySelectorAll('button');
    buttons.forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
}

// Fungsi Filter Pencarian Master Tindakan via Key Word
function filterMasterTindakan() {
    let keyword = document.getElementById('keywordMasterTindakan').value.toLowerCase();
    let rows = document.querySelectorAll('#bodyMasterTindakan tr');
    let count = 0;
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        if(text.includes(keyword)) {
            row.style.display = '';
            count++;
        } else {
            row.style.display = 'none';
        }
    });
    document.getElementById('recordMasterTindakan').innerText = count;
}

// Fungsi Simpan Tindakan Terpilih ke Tab "Tindakan Dilakukan"
function simpanTindakanMedis() {
    let checkboxes = document.querySelectorAll('.tindakan-checkbox:checked');
    if(checkboxes.length === 0) {
        alert('Pilih minimal satu tindakan dengan mencentang kotak di tabel!');
        return;
    }

    let tbodyDilakukan = document.getElementById('bodyTindakanDilakukan');
    let dokterAktif = document.getElementById('rpNamaDokter').value;
    let kodeDokterAktif = document.getElementById('rpKodeDokter').value;
    let now = new Date();
let tglSekarang = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
let jamSekarang = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');


    checkboxes.forEach(chk => {
        let index = chk.getAttribute('data-index');
        let t = daftarMasterTindakan[index];

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" checked></td>
            <td>${document.querySelectorAll('#ruangPemeriksaanModal input[type="text"]')[0]?.value || ''}</td>
         <td>${document.querySelectorAll('#ruangPemeriksaanModal input[type="text"]')[1]?.value || ''}</td>
    <td>${document.querySelectorAll('#ruangPemeriksaanModal input[type="text"]')[2]?.value || ''}</td>
            <td>${t.kode} ${t.nama}</td>
            <td>${kodeDokterAktif}</td>
            <td>${dokterAktif}</td>
            <td>${tglSekarang}</td>
            <td>${jamSekarang}</td>
            <td>${t.tarif}</td>
        `;
        tbodyDilakukan.appendChild(tr);
        chk.checked = false; // Reset checkbox tagihan
    });

    // Pindah otomatis ke tab Tindakan Dilakukan agar user langsung lihat hasilnya
    let tabButtons = document.querySelectorAll('#rp-sub-penangananDokter .rj-tab-header button');
    if(tabButtons.length >= 2) {
        switchDpTab('dilakukan', tabButtons[1]);
    }

     // --- UPDATE STATUS RAWAT JALAN JADI "Sudah" ---
    let currentNoRawat = document.querySelector('#ruangPemeriksaanModal input[type="text"]')?.value;
    if (currentNoRawat) {
        let listRawatJalan = JSON.parse(localStorage.getItem('simrs_rawat_jalan')) || [];
        let pasienDitemukan = listRawatJalan.find(item => item.noRawat === currentNoRawat);
        
        if (pasienDitemukan) {
            pasienDitemukan.status = "Sudah";
            localStorage.setItem('simrs_rawat_jalan', JSON.stringify(listRawatJalan));
            if (typeof muatTabelRawatJalan === 'function') {
                muatTabelRawatJalan();
            }
        }
    }
    
    alert('Tindakan berhasil disimpan ke rekam medis!');
}

// Fungsi Simpan Tindakan Rawat Jalan yang Aman & Tanpa Konflik
function simpanTindakanSimple() {
    let tbodyDilakukan = document.getElementById('bodyTindakanDilakukan');
    if(!tbodyDilakukan) {
        alert('Data berhasil disimpan!');
        return;
    }

    let dokterAktif = document.getElementById('rpNamaDokter') ? document.getElementById('rpNamaDokter').value : "dr. Aisyah";
    let kodeDokterAktif = document.getElementById('rpKodeDokter') ? document.getElementById('rpKodeDokter').value : "D0000002";

    // Ambil baris pertama dari tabel tagihan sebagai simulasi data yang dipilih
    let trBaru = document.createElement('tr');
    trBaru.innerHTML = `
        <td><input type="checkbox" checked></td>
        <td>2023/10/13/000001</td>
        <td>000004</td>
        <td>DEPIYANTO</td>
        <td>J000614 RJP (Resusitasi Jantung Paru)</td>
        <td>${kodeDokterAktif}</td>
        <td>${dokterAktif}</td>
        <td>2023-10-17</td>
        <td>13:00:49</td>
        <td>250,000</td>
    `;
    tbodyDilakukan.appendChild(trAsli = trBaru);

    // Update jumlah record
    let totalRecord = tbodyDilakukan.querySelectorAll('tr').length;
    let recordLabel = document.getElementById('recordTindakanDilakukan');
    if(recordLabel) recordLabel.innerText = totalRecord;

    // Pindah otomatis ke tab Tindakan Dilakukan
    let tabButtons = document.querySelectorAll('#rp-sub-penangananDokter .rj-tab-header button');
    if(tabButtons.length >= 2) {
        switchDpTab('dilakukan', tabButtons[1]);
    }

    alert('Tindakan berhasil disimpan ke rekam medis!');
}

// Fungsi Simpan Tindakan Rawat Jalan yang Aman & Tanpa Konflik
function simpanTindakanSimple() {
    let tbodyDilakukan = document.getElementById('bodyTindakanDilakukan');
    if(!tbodyDilakukan) {
        alert('Data berhasil disimpan!');
        return;
    }

    let dokterAktif = document.getElementById('rpNamaDokter') ? document.getElementById('rpNamaDokter').value : "dr. Aisyah";
    let kodeDokterAktif = document.getElementById('rpKodeDokter') ? document.getElementById('rpKodeDokter').value : "D0000002";

    // Ambil baris pertama dari tabel tagihan sebagai simulasi data yang dipilih
    let trBaru = document.createElement('tr');
    trBaru.innerHTML = `
        <td><input type="checkbox" checked></td>
        <td>2023/10/13/000001</td>
        <td>000004</td>
        <td>DEPIYANTO</td>
        <td>J000614 RJP (Resusitasi Jantung Paru)</td>
        <td>${kodeDokterAktif}</td>
        <td>${dokterAktif}</td>
        <td>2023-10-17</td>
        <td>13:00:49</td>
        <td>250,000</td>
    `;
    tbodyDilakukan.appendChild(trAsli = trBaru);

    // Update jumlah record
    let totalRecord = tbodyDilakukan.querySelectorAll('tr').length;
    let recordLabel = document.getElementById('recordTindakanDilakukan');
    if(recordLabel) recordLabel.innerText = totalRecord;

    // Pindah otomatis ke tab Tindakan Dilakukan
    let tabButtons = document.querySelectorAll('#rp-sub-penangananDokter .rj-tab-header button');
    if(tabButtons.length >= 2) {
        switchDpTab('dilakukan', tabButtons[1]);
    }

    alert('Tindakan berhasil disimpan ke rekam medis!');
}

// Fungsi Tombol Baru (Reset/Kosongkan Pilihan)
function tindakanBaru() {
    let checkboxes = document.querySelectorAll('.tindakan-checkbox');
    checkboxes.forEach(chk => chk.checked = false);
    alert('Form direset, silakan pilih tindakan baru.');
}

// Fungsi Tombol Hapus (Menghapus baris yang dicentang di Tindakan Dilakukan)
function tindakanHapus() {
    let tbody = document.getElementById('bodyTindakanDilakukan');
    if(!tbody) return;
    let checkedRows = tbody.querySelectorAll('tr input[type="checkbox"]:checked');
    
    if(checkedRows.length === 0) {
        alert('Centang baris pada tabel Tindakan Dilakukan yang ingin dihapus!');
        return;
    }

    checkedRows.forEach(chk => {
        let tr = chk.closest('tr');
        if(tr) tr.remove();
    });

    // Update jumlah record
    let totalRecord = tbody.querySelectorAll('tr').length;
    let recordLabel = document.getElementById('recordTindakanDilakukan');
    if(recordLabel) recordLabel.innerText = totalRecord;

    alert('Tindakan terpilih berhasil dihapus.');
}

// Fungsi Tombol Ganti (Update data tindakan yang dipilih)
function tindakanGanti() {
    let tbody = document.getElementById('bodyTindakanDilakukan');
    if(!tbody) return;
    let checkedRows = tbody.querySelectorAll('tr input[type="checkbox"]:checked');

    if(checkedRows.length === 0) {
        alert('Pilih baris di tabel Tindakan Dilakukan yang ingin diganti/diperbarui datanya!');
        return;
    }

    let dokterAktif = document.getElementById('rpNamaDokter') ? document.getElementById('rpNamaDokter').value : "dr. Aisyah";
    let kodeDokterAktif = document.getElementById('rpKodeDokter') ? document.getElementById('rpKodeDokter').value : "D0000002";

    checkedRows.forEach(chk => {
        let tr = chk.closest('tr');
        if(tr) {
            // Update kolom dokter dengan dokter aktif yang sedang dipilih di atas
            let tdDokterKode = tr.querySelectorAll('td')[5];
            let tdDokterNama = tr.querySelectorAll('td')[6];
            if(tdDokterKode) tdDokterKode.innerText = kodeDokterAktif;
            if(tdDokterNama) tdDokterNama.innerText = dokterAktif;
        }
    });

    alert('Data tindakan berhasil diperbarui (diganti dengan dokter aktif)!');
}

// --- JEMBATAN INTEGRASI REGISTRASI KE RAWAT JALAN ---

// 1. Simpan data dari form Registrasi ke localStorage saat tombol Simpan diklik
const originalSimpanReg = window.simpanRegistrasi || function(){};
window.simpanRegistrasi = function() {
    // Jalankan fungsi simpan asli lu dulu
    originalSimpanReg();

    // Ambil nilai dari form registrasi
    let dataBaru = {
        noReg: document.getElementById('regNoReg') ? document.getElementById('regNoReg').value : "001",
        noRawat: document.getElementById('regNoRawat') ? document.getElementById('regNoRawat').value : "2026/08/05/00001",
        tanggal: document.getElementById('regTgl') ? document.getElementById('regTgl').value : "05-08-2026",
        jam: "12:54:31",
        kodeDokter: document.getElementById('regDokter') ? document.getElementById('regDokter').value : "DR-001",
        dokterNama: document.getElementById('regDokterNama') ? document.getElementById('regDokterNama').value : "dr. Umum",
        noRM: document.getElementById('regRM') ? document.getElementById('regRM').value : "00023",
        namaPasien: document.getElementById('regNamaPasien') ? document.getElementById('regNamaPasien').value : "Pasien",
        jk: "L",
        umur: document.getElementById('regUmur') ? document.getElementById('regUmur').value : "",
        poliklinik: document.getElementById('regUnitNama') ? document.getElementById('regUnitNama').value : "Poliklinik Umum",
        penanggungJawab: document.getElementById('regPJ') ? document.getElementById('regPJ').value : "-",
        alamatPJ: document.getElementById('regAlamatPJ') ? document.getElementById('regAlamatPJ').value : "-",
        hubunganPJ: document.getElementById('regHub') ? document.getElementById('regHub').value : "AYAH",
        biayaReg: "10,000",
        jenisBayar: document.getElementById('regJenisBayarNama') ? document.getElementById('regJenisBayarNama').value : "UMUM",
        status: "Belum"
    };

    // Ambil data lama dari localStorage atau buat array baru
    let listRawatJalan = JSON.parse(localStorage.getItem('simrs_rawat_jalan')) || [];
    listRawatJalan.push(dataBaru);
    localStorage.setItem('simrs_rawat_jalan', JSON.stringify(listRawatJalan));

    // Refresh tabel rawat jalan jika fungsi muat datanya ada
    if(typeof muatTabelRawatJalan === 'function') {
        muatTabelRawatJalan();
    }
};

// 2. Muat dan tampilkan data otomatis ke tabel Rawat Jalan saat menu Rawat Jalan dibuka
function muatTabelRawatJalan() {
    let tbodyRJ = document.getElementById('bodyTabelPasienRJ');
    if(!tbodyRJ) return;

    // Ambil data dari localStorage (kalau kosong, masukin data dummy awal lu)
    let listRawatJalan = JSON.parse(localStorage.getItem('simrs_rawat_jalan'));
    if(!listRawatJalan || listRawatJalan.length === 0) {
        listRawatJalan = [
            
        ];
        localStorage.setItem('simrs_rawat_jalan', JSON.stringify(listRawatJalan));
    }

    tbodyRJ.innerHTML = '';
    listRawatJalan.forEach(d => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${d.kodeDokter}</td>
            <td>${d.dokterNama}</td>
            <td>${d.noRM}</td>
            <td>${d.namaPasien}</td>
            <td>${d.poliklinik}</td>
            <td>${d.penanggungJawab}</td>
            <td>${d.alamatPJ}</td>
            <td>${d.hubunganPJ}</td>
            <td>${d.biayaReg}</td>
            <td>${d.jenisBayar}</td>
            <td>${d.status}</td>
            <td>${d.noRawat}</td>
        `;


        // SAAT BARIS TABEL DI-KLIK: Lempar datanya ke header atas secara dinamis
        tr.onclick = function() {
            let elNoRawat = document.getElementById('rjHeadNoRawat');
            let elNoReg = document.getElementById('rjHeadNoReg');
            let elNoRM = document.getElementById('rjHeadRM');
            let elNamaPasien = document.getElementById('rjHeadNama');

            if(elNoRawat) elNoRawat.value = d.noRawat;
            if(elNoReg) elNoReg.value = d.noReg;
            if(elNoRM) elNoRM.value = d.noRM;
            if(elNamaPasien) elNamaPasien.value = d.namaPasien;
        };

        // Saat baris di double-click, buka ruang pemeriksaan
        tr.ondblclick = function() {
            bukaRuangPemeriksaan(d.noRawat, d.noRM, d.namaPasien);
        };

        tbodyRJ.appendChild(tr);
    });


    // Update record counter di rawat jalan
    let recRJ = document.getElementById('rjRecordCount');
    if(recRJ) recRJ.innerText = listRawatJalan.length;
}

// 3. Hook saat tombol menu Rawat Jalan diklik di atas
const originalBukaRJ = window.openRawatJalanModule || function(){};
window.openRawatJalanModule = function() {
    originalBukaRJ();
    muatTabelRawatJalan();
};

// 4. Sinkronisasi data identitas pasien saat Ruang Pemeriksaan dibuka
const originalBukaRP2 = window.bukaRuangPemeriksaan || function(){};
window.bukaRuangPemeriksaan = function(noRawat, rm, nama) {
    originalBukaRP2(noRawat, rm, nama);
    let modal = document.getElementById('ruangPemeriksaanModal');
    if(modal) modal.style.display = 'flex';

    // Update header identitas di dalam modal ruang pemeriksaan secara dinamis
    let inputs = modal.querySelectorAll('input[type="text"]');
    if (inputs.length >= 3) {
        inputs[0].value = noRawat || ''; // Kolom No. Rawat
        inputs[1].value = rm || ''; // Kolom No. RM
        inputs[2].value = nama || ''; // Kolom Nama Pasien
    }
}

 
; 
// <--- Tutup fungsi di atas sudah pas di situ --->

// <--- Nah, kode simpan ini tempel persis di bawahnya mentok ke bawah: --->
document.getElementById('btnSimpanTindakan').addEventListener('click', function() {
    let noRawat = document.querySelector('#ruangPemeriksaanModal input').value;
    let kodeDokter = document.getElementById('rpKodeDokter').value;
    let namaDokter = document.getElementById('rpNamaDokter').value;
    
    let tbody = document.getElementById('bodyTindakanDilakukan');
    if(tbody) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${noRawat}</td>
            <td>-</td>
            <td>-</td>
            <td>Tindakan Medis</td>
            <td>${kodeDokter}</td>
            <td>${namaDokter}</td>
            <td>2026/08/06</td>
            <td>21:50:00</td>
            <td>0</td>
        `;
        tbody.appendChild(tr);
    }
});

function setOtomatisRegistrasi() {

    let sekarang = new Date();

    let tahun = sekarang.getFullYear();

    let bulan = String(sekarang.getMonth() + 1).padStart(2, '0');

    let tanggal = String(sekarang.getDate()).padStart(2, '0');

    

    // Set No. Rawat otomatis

    let noRawat = document.getElementById('regNoRawat');

    if (noRawat) noRawat.value = `${tahun}/${bulan}/${tanggal}/00001`;



    // Set Tanggal Reg otomatis

    let tglReg = document.getElementById('regTgl');

    if (tglReg) {

        tglReg.value = `${tanggal}-${bulan}-${tanggal}`; // atau format DD-MM-YYYY

        

        // Set Jam, Menit, Detik otomatis ke input di sebelah tanggal

        let parent = tglReg.parentElement;

        if (parent) {

            let inputs = parent.querySelectorAll('input[type="text"]');

            if (inputs.length >= 4) {

                inputs[1].value = String(sekarang.getHours()).padStart(2, '0');

                inputs[2].value = String(sekarang.getMinutes()).padStart(2, '0');

                inputs[3].value = String(sekarang.getSeconds()).padStart(2, '0');

        

    }

        }

    }

}

// Buka Modal Dokter Spesialis
function openModalDokterSOAP() {
    let modal = document.getElementById('modalDokterSOAP');
    if(modal) modal.style.display = 'flex';
}

// Tutup Modal Dokter Spesialis
function closeModalDokterSOAP() {
    let modal = document.getElementById('modalDokterSOAP');
    if(modal) modal.style.display = 'none';
}

// Masukkan data dokter yang dipilih ke form Dilakukan
function pilihDokterSOAP(kode, namaLengkap) {
    let inputKode = document.getElementById('soapKodeDokter');
    let inputNama = document.getElementById('soapNamaDokter');

    if(inputKode) inputKode.value = kode;
    if(inputNama) inputNama.value = namaLengkap;

    closeModalDokterSOAP();
}

// Fungsi Simpan Pemeriksaan SOAP Presisi Tinggi
function pemeriksaanSimpan() {
    // 1. Ambil data identitas dari header modal secara aman
    let allInputs = document.querySelectorAll('#ruangPemeriksaanModal input[type="text"]');
    let noRawatVal = allInputs.length > 0 ? allInputs[0].value : "2026/08/05/00001";
    let noRMVal = allInputs.length > 1 ? allInputs[1].value : "00023";
    let namaVal = allInputs.length > 2 ? allInputs[2].value : "Wahyu Irhamna";

    // 2. Ambil nilai dari form input TTV dan SOAP
    let suhu = document.getElementById('soapSuhu') ? document.getElementById('soapSuhu').value : "";
    let tensi = document.getElementById('soapTensi') ? document.getElementById('soapTensi').value : "";
    let nadi = document.getElementById('soapNadi') ? document.getElementById('soapNadi').value : "";
    let respirasi = document.getElementById('soapRespirasi') ? document.getElementById('soapRespirasi').value : "";
    let tinggi = document.getElementById('soapTinggi') ? document.getElementById('soapTinggi').value : "";
    let berat = document.getElementById('soapBerat') ? document.getElementById('soapBerat').value : "";
    let spo2 = document.getElementById('soapSpO2') ? document.getElementById('soapSpO2').value : "";
    let gcs = document.getElementById('soapGCS') ? document.getElementById('soapGCS').value : "";
    let kesadaran = document.getElementById('soapKesadaran') ? document.getElementById('soapKesadaran').value : "Compos Mentis";

    // 3. Format Tanggal & Jam saat ini
    let d = new Date();
    let tglRawat = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    let jamRawat = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0');

    // 4. Target langsung ke tbody tabel input SOAP berdasarkan ID
    let tbody = document.getElementById('tbodyInputSOAP');
    if (!tbody) {
        alert("Gagal menemukan tabel input data!");
        return;
    }

    // Bersihkan tulisan "Kosong" jika ada
    if (tbody.rows.length === 1 && tbody.rows[0].innerText.includes('Kosong')) {
        tbody.innerHTML = '';
    }

    // 5. Buat baris baru dan masukkan data
    let tr = document.createElement('tr');
    tr.style.borderBottom = "1px solid #d3d3d3";
    tr.innerHTML = `
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;"><input type="checkbox" checked></td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${noRawatVal}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${noRMVal}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${namaVal}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${tglRawat}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${jamRawat}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${suhu}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${tensi}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${nadi}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${respirasi}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${tinggi}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${berat}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${spo2}</td>
        <td style="padding: 3px; border-right: 1px solid #d3d3d3;">${gcs}</td>
        <td style="padding: 3px;">${kesadaran}</td>
    `;
    
    tbody.appendChild(tr);

    // 6. Update label Record di bawah form SOAP secara akurat
    let soapTab = document.getElementById('pemeriksaanSOAP');
    if (soapTab) {
        let recordDivs = soapTab.querySelectorAll('div');
        recordDivs.forEach(div => {
            if (div.style.fontSize === '11px' && div.innerText.includes('Record :')) {
                div.innerText = "Record : " + tbody.querySelectorAll('tr').length;
            }
        });
        // Paksa kontainer agar tetap tampil normal (tidak blank)
        soapTab.style.display = 'block';
    }

    // --- UPDATE STATUS RAWAT JALAN JADI "Sudah" ---
    let listRawatJalan = JSON.parse(localStorage.getItem('simrs_rawat_jalan')) || [];
    let pasienDitemukan = listRawatJalan.find(item => item.noRawat === noRawatVal);
    
    if (pasienDitemukan) {
        pasienDitemukan.status = "Sudah";
        localStorage.setItem('simrs_rawat_jalan', JSON.stringify(listRawatJalan));
        
        if (typeof muatTabelRawatJalan === 'function') {
            muatTabelRawatJalan();
        }
    }

    alert('Data pemeriksaan SOAP berhasil disimpan!');
    // Simpan daftar tabel SOAP ke localStorage agar tidak hilang saat refresh
    let semuaBarisSOAP = tbody.innerHTML;
    localStorage.setItem('simrs_tabel_soap_' + noRawatVal, semuaBarisSOAP);

}

// Fungsi Tombol Aksi Lainnya pada Form Pemeriksaan SOAP
function pemeriksaanBaru() {
    // Mengosongkan kembali semua input form TTV dan SOAP
    let inputs = document.querySelectorAll('#pemeriksaanSOAP input[type="text"], #pemeriksaanSOAP textarea');
    inputs.forEach(el => el.value = '');
    
    // Kembalikan kesadaran ke default
    let kesadaran = document.getElementById('soapKesadaran');
    if (kesadaran) kesadaran.value = 'Compos Mentis';
    
    // Pastikan kontainer tetap tampil
    let soapTab = document.getElementById('pemeriksaanSOAP');
    if (soapTab) soapTab.style.display = 'block';
}

function pemeriksaanHapus() {
    let tbody = document.getElementById('tbodyInputSOAP');
    if (!tbody) return;

    // Hapus baris yang centang checkbox-nya aktif
    let checkboxes = tbody.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Pilih data pada tabel yang ingin dihapus terlebih dahulu!');
        return;
    }

    if (confirm('Yakin ingin menghapus data pemeriksaan yang dipilih?')) {
        checkboxes.forEach(cb => {
            let row = cb.closest('tr');
            if (row) row.remove();
        });

        // Jika tabel kosong, kembalikan teks "Kosong"
        if (tbody.rows.length === 0) {
            tbody.innerHTML = `<tr><td colspan="15" style="text-align: center; color: #666; padding: 10px;">Kosong</td></tr>`;
        }

        // Update Record Count
        updateRecordCountSOAP();
        alert('Data berhasil dihapus.');
    }
}

function pemeriksaanGanti() {
    alert('Fungsi Ganti/Edit data aktif. Silakan sesuaikan data pada baris tabel.');
}

function pemeriksaanCetak() {
    window.print();
}

function pemeriksaanSemua() {
    let tbody = document.getElementById('tbodyInputSOAP');
    if (!tbody) return;
    let checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
    let allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

function pemeriksaanKeluar() {
    // Menutup modal ruang pemeriksaan
    let modal = document.getElementById('ruangPemeriksaanModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fungsi Bantu untuk Update Record Count
function updateRecordCountSOAP() {
    let soapTab = document.getElementById('pemeriksaanSOAP');
    let tbody = document.getElementById('tbodyInputSOAP');
    if (soapTab && tbody) {
        let recordDivs = soapTab.querySelectorAll('div');
        recordDivs.forEach(div => {
            if (div.style.fontSize === '11px' && div.innerText.includes('Record :')) {
                let actualRows = tbody.querySelectorAll('tr');
                let count = (actualRows.length === 1 && actualRows[0].innerText.includes('Kosong')) ? 0 : actualRows.length;
                div.innerText = "Record : " + count;
            }
        });
    }
}

// Fungsi untuk membuka modal jenis bayar
function bukaModalJenisBayar() {
    let modal = document.getElementById('modalJenisBayar');
    if (modal) modal.style.display = 'flex';
}

// Fungsi untuk menutup modal jenis bayar
function tutupModalJenisBayar() {
    let modal = document.getElementById('modalJenisBayar');
    if (modal) modal.style.display = 'none';
}

// Fungsi yang otomatis ngisi input pas salah satu jenis bayar diklik
function pilihJenisBayar(kode, nama) {
    let inputKode = document.getElementById('regJenisBayarKode');
    let inputNama = document.getElementById('regJenisBayarNama');
    
    if (inputKode) inputKode.value = kode;
    if (inputNama) inputNama.value = nama;
    
    tutupModalJenisBayar();
}

// Fungsi untuk Mengisi Form Input dengan Data yang Mau Diubah
function ubahDataPasien(index) {
    let databasePasien = getDatabasePasien();
    let p = databasePasien[index];
    if(!p) return;

    // Pindah otomatis ke tab Input Pasien (Tab 1)
    switchTab('tabInput');

    // Masukkan data lama ke form input
    document.getElementById('inputNoRM').value = p.rm;
    document.getElementById('inputNama').value = p.nama;
    document.getElementById('inputJK').value = p.jk;
    document.getElementById('inputGD').value = p.gd;
    document.getElementById('inputTmpLahir').value = p.tmpLahir;
    document.getElementById('inputTglLahir').value = p.tglLahir;
    document.getElementById('inputIbu').value = p.ibu;
    document.getElementById('inputAgama').value = p.agama;
    document.getElementById('inputNikah').value = p.nikah;
    document.getElementById('inputAskes').value = p.asuransi;
    document.getElementById('inputNoPeserta').value = p.peserta;
    document.getElementById('inputTelp').value = p.telp;
    document.getElementById('inputKTP').value = p.ktp;
    document.getElementById('inputPendidikan').value = p.pendidikan;

    // Ubah tombol simpan sementara agar melakukan Update/Ganti data berdasarkan index
    let btnSimpan = document.querySelector('#tabInput .btn-simpan');
    if(btnSimpan) {
        btnSimpan.innerText = "Simpan Perubahan Data";
        btnSimpan.onclick = function() {
            simpanPerubahanPasien(index);
        };
    }
}

// Fungsi Eksekusi Simpan Perubahan Edit Data Pasien
function simpanPerubahanPasien(index) {
    let databasePasien = getDatabasePasien();
    
    let jalan = document.getElementById('inputAlamatJalan').value;
    let kec = document.getElementById('inputKecamatan').value;
    let kab = document.getElementById('inputKabupaten').value;
    let alamatLengkap = jalan + (kec ? ", Kec. " + kec : "") + (kab ? ", Kab/Kota " + kab : "");

    databasePasien[index].nama = document.getElementById('inputNama').value;
    databasePasien[index].jk = document.getElementById('inputJK').value;
    databasePasien[index].gd = document.getElementById('inputGD').value;
    databasePasien[index].tmpLahir = document.getElementById('inputTmpLahir').value;
    databasePasien[index].tglLahir = document.getElementById('inputTglLahir').value;
    databasePasien[index].ibu = document.getElementById('inputIbu').value;
    databasePasien[index].agama = document.getElementById('inputAgama').value;
    databasePasien[index].nikah = document.getElementById('inputNikah').value;
    databasePasien[index].asuransi = document.getElementById('inputAskes').value;
    databasePasien[index].peserta = document.getElementById('inputNoPeserta').value;
    databasePasien[index].telp = document.getElementById('inputTelp').value;
    databasePasien[index].ktp = document.getElementById('inputKTP').value;
    databasePasien[index].pendidikan = document.getElementById('inputPendidikan').value;
    if(jalan) databasePasien[index].alamat = alamatLengkap;

    localStorage.setItem('simrs_pasien_db', JSON.stringify(databasePasien));
    alert('Data pasien berhasil diperbarui!');

    // Kembalikan tombol simpan seperti semula
    let btnSimpan = document.querySelector('#tabInput .btn-simpan');
    if(btnSimpan) {
        btnSimpan.innerText = "Simpan Data Pasien Baru";
        btnSimpan.onclick = simpanPasienBaru;
    }

    switchTab('tabData');
}

// Fungsi Hapus Data Pasien dari LocalStorage
function hapusDataPasien(index) {
    let databasePasien = getDatabasePasien();
    let pasienDihapus = databasePasien[index];

    if(confirm(`Yakin ingin menghapus data pasien atas nama "${pasienDihapus.nama}" (No. RM: ${pasienDihapus.rm})?`)) {
        databasePasien.splice(index, 1);
        localStorage.setItem('simrs_pasien_db', JSON.stringify(databasePasien));
        muatDataPasienTabel();
        alert('Data pasien berhasil dihapus.');
    }
}

// Fungsi Filter Pencarian Tabel SOAP
function filterTabelSOAP() {
    let keyword = document.getElementById('keywordPencarian').value.toLowerCase().trim();
    let tbody = document.getElementById('tbodyInputSOAP');
    if (!tbody) return;

    let rows = tbody.querySelectorAll('tr');
    let count = 0;

    rows.forEach(row => {
        if (row.innerText.includes('Kosong')) {
            row.style.display = 'none';
            return;
        }

        let textBaris = row.innerText.toLowerCase();
        if (keyword === "" || textBaris.includes(keyword)) {
            row.style.display = '';
            count++;
        } else {
            row.style.display = 'none';
        }
    });

    // Update jumlah record di bawah
    let recordDiv = document.querySelector('#pemeriksaanSOAP div[style*="font-size: 11px"]');
    if (recordDiv && recordDiv.innerText.includes('Record :')) {
        recordDiv.innerText = "Record : " + count;
    }
}

