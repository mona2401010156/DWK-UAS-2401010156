$(function(){
  var URLAPI = "https://apimhstiki.ptov.my.id"
  var NIM = "2401010156"
  let urlProduk = URLAPI+"/"+NIM+"/produk/list"

  // Menarik data dari API untuk judul, deskripsi, dan copyright
  $.ajax({
    url: URLAPI+'/slideshow/'+NIM,
    method: 'GET',
    dataType: 'json',
    success:function(dta){
      // Menampilkan data yang diterima dari API
      $("#judul").html(dta.judul)
      $("#deskripsi").html(dta.deskripsi)
      $("#kopirig").html("Copyright 2024 &copy; "+dta.judul+" by "+dta.nama)

      var slideimg = ""
      dta.images.forEach(function(image, index){
        var aktif = index == 0 ? 'active' : ''
        slideimg += `
          <div class="carousel-item ${aktif}">
            <img src="${image.url}" class="d-block w-100" alt="${image.alt}">
          </div>`
      })
      $("#sliderimg").html(slideimg)
    },
    error:function(xhr, status, error){
      console.log("Ajax Error: ", status, error)
    }
  })



  // Menarik data produk
  $.ajax({
    url: urlProduk,
    method: 'GET',
    dataType: 'json',
    success: function(dta){
      if(dta && dta.error == 0){
        let tProduk = ""
        dta.produk.forEach(function(brg, index){
          tProduk += `<div class="card" style="width: 15rem; float: left; margin:15px;">
            <img src="${brg.IMG}" class="card-img-top produkitem" alt="${brg.ITEM}">
            <div class="card-body">
              <h5 class="card-title">${brg.ITEM}</h5>
              <p class="card-text">Rp. ${brg.HRGJUAL},-</p>
              <a href="#" class="btn btn-primary">detail</a>
              <a href="pemesanan.html" class="btn btn-warning">Beli</a>
            </div>
          </div>`
        })
        $('#produklist').html(tProduk)
      } else {
        console.log("Tidak ada data produk")
      }
    },
    error: function(xhr, status, error){
      console.log("Ajax Error: ", status, error)
    }
  })
})


//testimoni
var nim="2401010156"
var urlAPI="https://apimhstiki.ptov.my.id/"
var urlREAD= urlAPI+`testi-${nim}/read`
//console.log(urlREAD)
$(function(){
    $.ajax({
        url: urlREAD,
        method: "GET",
        dataType: "json",
        success: function(dta){
            let tbdta="";
            let ipx="";
            if(dta.error==0){
                //untuk kode error
                dta.TESTI.forEach (function(isi){
                    tbdta+=`<tr>
            <td>${isi.NAMA}</td>
            <td>${isi.EMAIL}</td>
            <td>${isi.TESTI}</td>
            <td>${isi.IPX}</td>
            <td> <a onClick="destroy ('${isi.IDX}')"class="btn btn-danger btn-sm"> hapus </a></td>
          </tr>`;
                });
            }else{
            if(dta.error==4){
                dta.TESTI.forEach (function(isi){
                    tbdta+=`
            <tr>
            <td>${isi.NAMA}</td>
            <td>${isi.EMAIL}</td>
            <td>${isi.TESTI}</td>
            <td>${ipx}</td>
            <td></td>
          </tr>`
                })
            }}
            $("tbody").html(tbdta)
        },      //bagian selai kode 0
        error: function(){
            console.log("Gagal Membaca data")
        }
    })
})