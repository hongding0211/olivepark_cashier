import React, {useEffect, useState} from 'react'
import './App.css'
import "antd/dist/antd.css"
import SearchBar from "./components/searchBar"
import {Table} from 'antd'
import sha256 from 'crypto-js/sha256'
import TransparentMask from "./components/transparentMask";

const App = () => {

    const data = [
        {
            barcode: '4639219613204',
            name: 'Code-001',
            price: 14513
        },
        {
            barcode: '4639219159603',
            name: 'Code-002',
            price: 154
        },
        {
            barcode: '4639219621209',
            name: 'Code-003',
            price: 545962
        },
        {
            barcode: '4639219011604',
            name: 'Code-004',
            price: 567643
        },
        {
            barcode: '4639219201807',
            name: 'Code-005',
            price: 341
        },
        {
            barcode: '4639219019808',
            name: 'Code-006',
            price: 8900921
        },

    ]

    const [items, setItems] = useState([])

    const [transactionID, setTransactionID] = useState(getTransactionID())

    const [time, setTime] = useState(getTime())

    const [showMask, setShowMask] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTime())
        }, 1000)
        return (() => {
            clearInterval(timer)
        })
    })

    function getTime() {
        const d = new Date(Date.now())
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    }

    function getTransactionID() {
        return sha256(Date.now().toString()).toString().substring(0, 16).toUpperCase()
    }

    function handleBarcodeInput(barcode) {
        console.log(barcode)
        const len = items.length
        const foundItem = data.find(e => e.barcode === barcode)
        let i = [...items]
        if (foundItem) {
            const idx = i.findIndex(e => e.barcode === barcode)
            if (idx === -1) {
                i.push({
                    key: len + 1,
                    barcode: barcode,
                    name: foundItem.name,
                    price: foundItem.price,
                    qty: 1
                })
            } else {
                i[idx].qty += 1
            }
        }
        setItems(i)
    }

    function totalCost() {
        let sum = 0
        for (const i of items)
            sum += i.qty * i.price
        return sum
    }

    function handleTender() {
        if (items.length > 0) {
            setTimeout(() => setShowMask(true), 200)
            setTimeout(() => setShowMask(false), 2500)
            setItems([])
            setTransactionID(getTransactionID())
        }
    }

    return (
        <div>
            <div className='main-container'>
                <div className='title'>
                    <svg height="32px" viewBox="0 0 963 283" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill='#111'>
                            <g id="1300006">
                                <path
                                    d="M639.483011,210.612308 C648.611841,214.531445 658.009117,217.793088 667.603011,220.372308 C674.723011,217.582308 689.423011,213.082308 689.423011,213.082308 C741.903011,185.082308 779.423011,193.972308 779.423011,193.972308 C723.503011,233.892308 697.483011,216.092308 690.873011,216.792308 C686.133011,217.292308 677.153011,220.122308 672.453011,221.682308 C686.664179,225.343378 701.158933,227.798755 715.783011,229.022308 C727.897565,230.024274 740.072624,230.061056 752.193011,229.132308 C767.311462,220.740664 783.356349,214.139473 800.003011,209.462308 C805.063011,191.762308 821.563011,156.722308 875.283011,125.012308 C875.283011,125.012308 853.283011,173.502308 819.723011,204.682308 C826.493011,203.322308 833.053011,202.282308 839.343011,201.482308 C841.733011,200.022308 844.123011,198.482308 846.503011,196.902308 C854.773011,185.602308 879.443011,153.032308 907.063011,127.432308 C906.653011,111.882308 912.843011,84.0323079 944.893011,39.8423079 C944.893011,39.8423079 951.613011,69.0023079 936.663011,104.262308 C945.503011,98.8323079 954.173011,95.0723079 962.243011,93.8923079 C962.243011,93.8923079 933.923011,170.402308 849.643011,199.012308 C848.853011,199.552308 848.073011,200.072308 847.283011,200.592308 C879.773011,197.412308 902.913011,200.772308 902.913011,200.772308 C834.583011,251.532308 769.913011,237.612308 752.913011,232.632308 C740.414678,233.622294 727.856456,233.592195 715.363011,232.542308 L713.963011,232.412308 C733.433011,237.942308 757.693011,247.412308 780.733011,263.342308 C780.733011,263.342308 729.733011,269.492308 677.013011,226.412308 C653.353011,220.822308 638.213011,213.892308 638.013011,213.792308 L639.483011,210.612308 Z"
                                    id="Path"/>
                                <path
                                    d="M0.103011252,198.522308 C-0.716988748,180.462308 3.35301125,161.872308 12.5130113,142.962308 C27.7430113,112.962308 46.6730113,92.3423079 68.8930113,81.0923079 C91.1130113,69.8423079 110.893011,68.1923079 128.403011,75.8523079 C145.713011,83.7823079 154.833011,101.492308 155.323011,129.052308 C154.693011,150.792308 149.833011,174.102308 140.513011,199.052308 C131.193011,223.742308 119.273011,244.462308 104.513011,261.002308 C89.7530113,277.542308 74.0030113,284.562308 57.1130113,281.862308 C37.9330113,278.362308 28.6230113,262.292308 29.3930113,233.862308 C10.6230113,228.452308 0.933011252,216.592308 0.103011252,198.522308 Z M31.9730113,215.522308 C39.5530113,186.272308 49.3130113,162.892308 61.6730113,144.872308 C64.0030113,142.182308 67.0030113,141.492308 71.0030113,142.482308 C74.9896222,143.460608 78.6210282,145.539657 81.4830113,148.482308 C84.7030113,151.202308 86.0130113,154.482308 85.4030113,157.542308 C84.9930113,158.992308 83.5330113,161.752308 80.8130113,165.852308 C77.4730113,170.962308 73.5030113,178.022308 68.9030113,186.552308 C64.0826749,196.090728 60.3910772,206.158722 57.9030113,216.552308 C59.8130113,216.262308 62.1430113,215.212308 65.1030113,213.372308 C67.9600868,211.700849 70.6404436,209.744189 73.1030113,207.532308 C75.1079377,205.993332 76.9447846,204.246987 78.5830113,202.322308 C80.4730113,200.182308 82.5830113,199.632308 84.7430113,201.142308 C87.0963446,202.395641 88.6063446,204.695641 89.2730113,208.042308 C89.9430113,211.162308 88.7030113,214.342308 85.7630113,217.792308 C81.9630113,221.372308 76.6763446,224.705641 69.9030113,227.792308 C63.3430113,230.872308 58.0430113,232.842308 54.2230113,233.432308 C52.7535673,239.875288 52.6785576,246.557968 54.0030113,253.032308 C55.1330113,260.232308 58.3630113,264.112308 63.4830113,265.162308 C71.7730113,264.572308 81.0430113,256.242308 91.4830113,240.162308 C101.733011,223.852308 110.903011,204.482308 118.543011,182.352308 C126.403011,159.952308 130.233011,139.792308 130.473011,121.352308 C130.713011,102.912308 124.633011,91.3523079 112.473011,86.8223079 C102.233011,83.8223079 89.7230113,88.0223079 74.7330113,99.3023079 C59.9630113,110.792308 46.3330113,129.932308 34.0530113,156.452308 C29.0274704,167.418367 25.5637761,179.034703 23.7630113,190.962308 C22.2730113,202.482308 25.1230113,210.562308 32.0030113,215.492308 L31.9730113,215.522308 Z"
                                    id="Shape"/>
                                <path
                                    d="M206.433011,92.8623079 C211.003501,93.8510965 215.217941,96.0672213 218.623011,99.2723079 C222.053011,102.202308 223.363011,104.992308 222.743011,107.392308 C215.743011,111.002308 209.033011,118.712308 202.563011,130.992308 C195.7249,143.893995 189.958821,157.335916 185.323011,171.182308 C180.924966,183.73347 177.429398,196.582858 174.863011,209.632308 C172.629678,220.558975 172.476345,226.558975 174.403011,227.632308 C177.173011,228.122308 180.753011,224.352308 185.403011,216.962308 C190.437989,208.749668 195.037672,200.277974 199.183011,191.582308 C203.763011,182.132308 207.093011,174.712308 209.593011,169.262308 C210.09402,167.875135 210.719922,166.536308 211.463011,165.262308 C212.015684,164.113762 213.188719,163.3943 214.463011,163.422308 C215.53275,163.299104 216.588513,163.747233 217.243011,164.602308 C217.883011,165.432308 217.903011,166.602308 217.243011,168.282308 L209.773011,186.702308 C205.003011,198.702308 200.223011,210.282308 195.443011,221.142308 C190.663011,232.242308 186.693011,239.302308 183.743011,242.282308 C178.256345,246.348975 172.096345,247.298975 165.263011,245.132308 C158.433011,242.962308 153.713011,238.132308 151.503011,230.442308 C149.933011,222.162308 151.503011,208.562308 155.983011,189.912308 C160.683318,171.060501 166.605841,152.534665 173.713011,134.452308 C180.963011,116.072308 187.643011,103.072308 194.163011,95.6123079 C197.450468,92.5360749 202.147063,91.4834558 206.433011,92.8623079 Z"
                                    id="Path"/>
                                <path
                                    d="M200.283011,199.272308 C202.623948,188.726165 205.629956,178.338738 209.283011,168.172308 C213.003011,157.932308 216.123011,150.542308 219.053011,145.722308 C220.505486,143.402439 223.08799,142.036802 225.823011,142.142308 C228.991419,142.108629 232.126374,142.79237 234.993011,144.142308 C237.694028,145.342385 240.052183,147.198659 241.853011,149.542308 C243.573011,151.542308 243.593011,153.642308 242.343011,155.452308 C238.763011,159.912308 235.003011,166.935641 231.063011,176.522308 C227.496217,185.255609 224.601144,194.24839 222.403011,203.422308 C220.403011,212.022308 220.633011,217.042308 222.983011,218.762308 C224.913011,219.382308 227.863011,217.312308 231.433011,212.392308 C235.73586,206.663092 239.603354,200.619506 243.003011,194.312308 C247.003011,187.022308 250.733011,180.232308 254.073011,173.492308 L261.133011,159.022308 C261.343011,158.302308 261.763011,157.772308 261.753011,157.312308 C262.363534,156.37684 263.387072,155.792492 264.503011,155.742308 C265.557847,155.719054 266.542083,156.270533 267.073011,157.182308 C267.538862,158.392438 267.473522,159.742808 266.893011,160.902308 C263.559678,168.782308 259.613011,177.908975 255.053011,188.282308 C250.263011,198.692308 245.893011,208.112308 241.513011,216.612308 C236.923011,225.152308 233.573011,230.502308 231.043011,232.732308 C225.973011,236.272308 220.233011,236.922308 213.833011,234.922308 C207.433011,232.922308 202.703011,228.572308 199.453011,222.162308 C197.913011,217.362308 198.003011,209.742308 200.283011,199.272308 Z M251.573011,118.612308 C249.038126,122.586191 246.080935,126.274298 242.753011,129.612308 C239.383011,132.892308 236.633011,134.472308 234.283011,133.912308 C232.153011,132.852308 231.053011,130.032308 231.013011,125.432308 C230.753901,120.891126 231.137694,116.33611 232.153011,111.902308 C232.953011,107.172308 233.983011,104.252308 235.243011,102.902308 C237.353011,100.972308 240.323011,100.282308 243.733011,100.682308 C246.997712,101.025083 250.139246,102.116749 252.913011,103.872308 C255.483011,105.782308 256.573011,107.872308 256.383011,110.012308 C255.091809,113.042723 253.479251,115.925884 251.573011,118.612308 L251.573011,118.612308 Z"
                                    id="Shape"/>
                                <path
                                    d="M274.633011,127.502308 C277.956549,127.524433 281.234338,128.279008 284.233011,129.712308 C287.233011,131.092308 288.303011,132.762308 287.683011,134.712308 C287.063011,136.422308 286.033011,140.032308 284.393011,146.042308 C282.753011,152.052308 280.913011,158.782308 279.073011,166.432308 C277.233011,174.082308 275.613011,181.432308 274.193011,188.372308 C272.983011,195.232308 272.193011,200.652308 272.193011,204.102308 C272.023011,207.812308 273.093011,208.332308 274.983011,205.972308 C278.343011,201.772308 283.763011,191.492308 291.473011,175.342308 C298.963011,159.222308 306.473011,141.262308 313.683011,121.492308 C314.523011,119.752308 316.213011,118.802308 318.763011,118.412308 C321.502182,118.258119 324.246028,118.617634 326.853011,119.472308 C329.425409,120.23395 331.775513,121.606274 333.703011,123.472308 C335.419296,124.891001 335.888941,127.327284 334.823011,129.282308 C326.703011,146.192308 317.943011,163.892308 308.353011,182.642308 C298.763011,201.392308 291.263011,214.282308 286.003011,221.772308 C282.98018,225.071575 278.822778,227.107416 274.363011,227.472308 C269.736287,228.09399 265.027477,227.469141 260.723011,225.662308 C256.801982,224.117896 253.837708,220.816435 252.723011,216.752308 C251.803011,209.752308 252.339678,199.768975 254.333011,186.802308 C256.333011,174.062308 258.763011,161.942308 261.623011,150.902308 C264.289678,139.675641 266.136345,132.945641 267.163011,130.712308 C268.693011,128.642308 271.233011,127.562308 274.633011,127.502308 Z"
                                    id="Path"/>
                                <path
                                    d="M346.163011,216.202308 C334.633011,212.682308 327.963011,204.492308 325.703011,191.712308 C324.963011,181.472308 327.813011,168.832308 334.253011,153.792308 C340.693011,138.792308 348.253011,127.002308 356.653011,118.562308 C364.033011,112.562308 371.893011,110.922308 380.653011,113.492308 C389.413011,116.062308 394.143011,121.782308 395.083011,130.612308 C394.933011,136.852308 393.303011,143.782308 390.403011,151.372308 C387.503011,158.962308 383.953011,165.252308 379.323011,169.882308 C375.750015,173.374302 371.144817,175.619028 366.193011,176.282308 C361.618211,177.328609 356.81644,176.584371 352.773011,174.202308 C351.792744,177.260465 351.250691,180.44208 351.163011,183.652308 C350.914404,187.272588 351.603232,190.895828 353.163011,194.172308 C354.473011,197.422308 357.463011,198.802308 361.503011,198.872308 C368.303011,197.872308 375.063011,193.102308 381.563011,184.732308 C388.344433,176.265548 394.307786,167.174867 399.373011,157.582308 C404.373011,147.832308 407.923011,140.842308 409.793011,136.632308 C410.017756,136.341267 410.16254,135.996544 410.213011,135.632308 C410.697706,134.817219 411.585018,134.327668 412.533011,134.352308 C413.532381,134.431267 414.492337,134.776575 415.313011,135.352308 C415.94955,135.894382 416.208044,136.759946 415.973011,137.562308 C412.873011,146.782308 407.683011,158.862308 400.813011,173.562308 C393.733011,188.462308 386.193011,200.222308 377.813011,209.112308 C368.083011,217.432308 357.473011,220.022308 346.163011,216.202308 Z M364.753011,161.532308 C368.050777,157.589666 370.796022,153.216114 372.913011,148.532308 C374.951414,144.191488 376.475099,139.627145 377.453011,134.932308 C378.263011,130.932308 378.023011,128.632308 376.953011,127.872308 C375.673011,127.612308 373.363011,129.812308 370.223011,134.672308 C366.84522,140.034414 363.767168,145.579581 361.003011,151.282308 C358.503833,156.295359 356.352098,161.474225 354.563011,166.782308 C358.213011,166.912308 361.593011,165.242308 364.753011,161.532308 Z"
                                    id="Shape"/>
                                <path
                                    d="M422.923011,150.732308 C427.406851,150.992759 431.905639,150.687017 436.313011,149.822308 L445.653011,126.512308 C438.223011,128.122308 432.653011,128.052308 429.063011,126.512308 C418.793011,120.732308 412.513011,110.412308 410.063011,95.3623079 C407.613011,80.3123079 410.613011,66.4923079 419.413011,53.3623079 C431.183011,38.8823079 448.293011,27.0423079 471.173011,17.5323079 C493.833011,8.06230792 515.703011,4.23230792 536.573011,5.63230792 C557.433011,7.25230792 571.153011,17.3523079 577.293011,35.7423079 C580.853011,50.8523079 577.623011,67.7423079 567.603011,86.7423079 C557.803011,105.742308 542.873011,123.242308 523.253011,139.162308 C503.423011,155.332308 480.563011,166.222308 454.673011,172.512308 C444.583011,205.372308 443.303011,225.832308 450.403011,233.952308 C448.516345,236.092308 444.909678,236.878975 439.583011,236.312308 C434.163744,235.638154 429.15986,233.061792 425.463011,229.042308 C421.173011,224.872308 419.393011,218.042308 420.153011,209.132308 C421.541199,198.060544 423.924166,187.136379 427.273011,176.492308 C421.513011,175.772308 417.273011,173.662308 414.443011,169.952308 C411.911124,166.411111 410.330685,162.279242 409.853011,157.952308 C409.593011,153.385641 409.979678,149.872308 411.013011,147.412308 C414.686023,149.392624 418.755219,150.526943 422.923011,150.732308 Z M439.003011,103.582308 C445.249125,103.322399 451.447082,102.369899 457.483011,100.742308 C466.483011,82.5523079 474.163011,67.5523079 481.063011,55.6623079 C487.743011,43.5823079 491.513011,37.2523079 492.563011,35.9323079 C494.861753,33.2593843 498.547591,32.2401494 501.893011,33.3523079 C505.60894,34.2316835 508.880673,36.4270482 511.103011,39.5323079 C513.473011,42.8523079 513.723011,46.0323079 511.633011,49.8123079 C503.263011,63.3023079 495.323011,77.1923079 488.023011,91.6723079 C505.504486,85.0829519 522.485601,77.2357448 538.833011,68.1923079 C539.344376,67.826673 540.031647,67.826673 540.543011,68.1923079 C541.026189,68.563918 541.396629,69.0624543 541.613011,69.6323079 C541.684409,70.3691003 541.545726,71.1110506 541.213011,71.7723079 C536.003011,79.2223079 527.363011,87.0223079 515.103011,95.1023079 C502.763233,103.271813 489.741613,110.361436 476.183011,116.292308 C472.023011,125.682308 468.073011,134.812308 464.763011,143.842308 C490.413011,135.512308 512.193011,122.032308 530.073011,103.162308 C548.183011,84.2623079 558.213011,66.6023079 560.383011,49.9123079 C561.303011,35.7323079 555.893011,27.1223079 544.803011,24.2223079 C533.493011,21.3523079 519.473011,22.5923079 503.143011,27.8623079 C486.274643,33.3757906 470.404656,41.5707815 456.143011,52.1323079 C441.383011,62.9323079 430.873011,74.9123079 424.833011,88.0223079 C422.543011,92.7523079 422.373011,96.4623079 424.103011,99.4123079 C425.833011,102.362308 430.743011,103.942308 439.003011,103.582308 Z M538.223011,153.712308 C553.378554,139.01816 567.436244,123.232504 580.283011,106.482308 C589.943011,94.1823079 597.513011,85.4123079 603.203011,80.1623079 C609.533011,75.0423079 615.463011,72.9823079 621.203011,73.9423079 C626.953011,75.1223079 632.303011,77.9423079 637.463011,82.9423079 C641.023011,78.0123079 644.823011,74.9423079 648.463011,73.8823079 C651.875798,72.8693136 655.520483,72.9532603 658.883011,74.1223079 C661.566921,75.0111653 663.944979,76.6404472 665.743011,78.8223079 C667.463011,80.8223079 667.743011,82.4323079 666.853011,83.4823079 C660.753011,89.9523079 655.733011,98.3223079 651.583011,108.402308 C647.937629,117.488873 645.461145,127.001663 644.213011,136.712308 C643.023011,145.412308 644.143011,150.762308 646.923011,152.642308 C649.693011,153.132308 653.483011,149.562308 658.513011,141.872308 C664.078329,133.535036 669.105236,124.850677 673.563011,115.872308 C678.563011,106.352308 682.113011,99.1323079 684.193011,94.6623079 L685.193011,92.4323079 C686.193011,90.4323079 687.493011,89.3123079 688.563011,89.1523079 C689.591661,88.9314041 690.640732,89.4272542 691.123011,90.3623079 C691.606997,91.6641808 691.545712,93.1061942 690.953011,94.3623079 C690.123011,96.7923079 688.883011,99.7423079 687.633011,103.152308 C683.283011,114.152308 678.093011,126.732308 672.063011,140.092308 C666.063011,153.682308 660.803011,162.552308 655.953011,166.752308 C652.153011,169.642308 646.843011,170.452308 640.023011,169.432308 C633.423011,168.372308 628.023011,164.592308 624.163011,157.822308 C620.483011,151.022308 620.793011,140.612308 625.113011,126.132308 L619.513011,139.432308 C617.643011,144.322308 615.513011,149.012308 613.703011,153.682308 C611.623011,158.372308 609.953011,161.852308 608.703011,164.352308 C606.071827,169.08861 601.534506,172.467931 596.243011,173.632308 C590.943011,174.912308 586.033011,173.822308 581.323011,170.862308 C576.613011,167.672308 573.583011,162.382308 572.433011,154.272308 C571.523011,148.652308 572.723011,140.872308 576.033011,131.612308 C567.838818,144.361119 558.945214,156.646578 549.393011,168.412308 C540.393011,179.702308 532.773011,186.622308 526.843011,189.152308 C525.098163,189.674644 523.325376,190.098644 521.533011,190.422308 C515.163011,191.422308 510.263011,190.782308 506.623011,188.112308 C503.151229,185.872389 500.504192,182.561838 499.083011,178.682308 C497.973011,174.682308 497.733011,171.292308 498.763011,168.372308 C510.153011,173.022308 523.293011,168.222308 538.253011,153.712308 L538.223011,153.712308 Z M595.033011,154.642308 C597.153011,154.092308 600.723011,149.642308 605.533011,141.512308 C610.533011,133.602308 615.983011,123.102308 622.013011,110.192308 L625.353011,103.002308 C626.244147,101.23592 626.661099,99.2683207 626.563011,97.2923079 C626.464184,95.1804098 625.860663,93.1229507 624.803011,91.2923079 C623.933011,89.3623079 622.643011,88.4023079 620.943011,88.4323079 C617.749678,88.6923079 614.383011,92.2056413 610.843011,98.9723079 C606.75289,106.350035 603.403221,114.114567 600.843011,122.152308 C598.200928,129.616652 596.092291,137.25921 594.533011,145.022308 C593.323011,151.462308 593.573011,154.642308 595.063011,154.642308 L595.033011,154.642308 Z"
                                    id="Shape"/>
                                <path
                                    d="M698.333011,60.9223079 C701.232345,60.3095386 704.242721,60.4821518 707.053011,61.4223079 C709.725392,61.946666 712.18228,63.2516705 714.113011,65.1723079 C715.838956,66.3126841 716.565097,68.482857 715.873011,70.4323079 C712.323011,77.4323079 708.583011,86.0623079 704.233011,96.8623079 C700.295264,106.643283 697.402524,116.813127 695.603011,127.202308 C698.083011,119.682308 702.233011,109.372308 707.843011,96.3023079 C713.453011,83.2323079 718.843011,72.7323079 723.693011,65.3023079 C727.263011,60.8423079 731.493011,58.5823079 736.813011,59.1423079 C742.029109,59.4668409 746.956553,61.6485386 750.703011,65.2923079 C754.783011,69.0423079 755.473011,73.7723079 753.193011,79.4123079 C748.112326,89.4224812 744.562791,100.138503 742.663011,111.202308 C740.863011,121.842308 743.263011,128.152308 749.663011,130.152308 C745.253011,135.212308 739.313011,137.042308 732.273011,135.152308 C725.273011,133.472308 720.933011,128.382308 719.153011,120.592308 C718.663011,114.682308 720.073011,107.102308 723.153011,97.8723079 C726.463011,88.6123079 729.363011,81.2523079 732.283011,75.9723079 C730.163011,76.3023079 726.593011,81.2223079 721.383011,90.9723079 C715.554119,102.00785 710.342758,113.35867 705.773011,124.972308 C700.583011,137.972308 696.443011,149.432308 693.363011,159.812308 C692.743011,161.752308 690.633011,162.992308 687.013011,163.322308 C683.49463,163.849469 679.899589,163.449637 676.583011,162.162308 C673.163011,160.842308 671.443011,158.582308 671.403011,155.162308 C671.343011,149.162308 673.343011,137.162308 677.203011,119.262308 C681.147238,100.959552 686.295091,82.9370543 692.613011,65.3123079 C693.548342,62.8941789 695.755251,61.2004149 698.333011,60.9223079 Z"
                                    id="Path"/>
                                <path
                                    d="M755.753011,101.372308 C761.503011,80.9123079 768.103011,61.0123079 775.753011,41.3723079 C783.403011,21.7323079 790.543011,9.02230792 797.503011,2.83230792 C801.222696,0.275445401 805.844868,-0.602549689 810.243011,0.412307923 C814.290134,1.38066516 818.034752,3.33542484 821.143011,6.10230792 C823.943011,8.90230792 824.823011,11.5323079 823.993011,13.9623079 C815.993011,18.1923079 807.553011,28.4623079 798.993011,45.2023079 C790.547518,61.6765444 783.256636,78.7175622 777.173011,96.2023079 C779.063011,92.4823079 782.003011,87.0223079 786.003011,79.9123079 C790.003011,72.8023079 794.373011,66.1923079 798.773011,59.7523079 C803.173011,53.3123079 806.773011,49.3223079 809.503011,47.7523079 C813.303011,45.7523079 817.773011,45.5623079 822.683011,46.8723079 C827.476197,48.2825747 831.636619,51.302236 834.463011,55.4223079 C837.273011,59.6023079 837.113011,64.9223079 834.463011,71.0923079 C831.963011,76.5423079 827.773011,82.9423079 821.893011,90.5223079 C816.013011,98.1023079 808.003011,104.632308 797.893011,110.112308 C803.093011,119.212308 808.683011,124.802308 814.893011,126.612308 C821.103011,128.422308 825.753011,128.392308 828.893011,126.292308 C830.399678,127.672308 830.003011,130.268975 827.703011,134.082308 C825.127792,138.214452 821.676497,141.730608 817.593011,144.382308 C813.139555,147.500353 807.744136,148.980825 802.323011,148.572308 C796.323011,147.192308 791.193011,142.692308 787.073011,134.802308 C782.749479,127.493691 779.876962,119.419405 778.613011,111.022308 C772.440033,123.249303 767.785486,136.185319 764.753011,149.542308 C763.923011,152.202308 761.813011,153.672308 758.413011,153.972308 C755.13629,154.549859 751.760538,154.014807 748.823011,152.452308 C745.823011,150.842308 744.533011,148.502308 744.923011,145.222308 C746.323011,136.442308 749.793011,121.862308 755.753011,101.372308 Z M792.093011,97.8523079 C796.910637,92.3665265 801.398523,86.5997264 805.533011,80.5823079 C809.533011,74.6723079 812.443011,70.0823079 813.893011,66.8623079 C815.343011,63.6423079 814.503011,63.3123079 811.333011,65.4123079 C802.253011,72.1023079 791.333011,87.4123079 778.613011,110.972308 C783.616108,107.15524 788.141944,102.750272 792.093011,97.8523079 L792.093011,97.8523079 Z"
                                    id="Shape"/>
                            </g>
                        </g>
                    </svg>
                    <span><strong>OOlive | Olive Park</strong>  Giving & Resucing</span>
                </div>
                <div className='basic-info'>
                    <div className='basic-info-col'>
                        <span>Store: 31320</span>
                        <span>{time}</span>
                    </div>
                    <div className='basic-info-col'>
                        <span>Cashier: 02251440</span>
                        <span>Transaction: {transactionID}</span>
                    </div>
                </div>
                <SearchBar handleBarcodeInput={handleBarcodeInput}/>
                <div className='table-container'>
                    <Table
                        dataSource={items}
                        columns={[
                            {
                                title: 'ID',
                                dataIndex: 'barcode',
                                key: 'id'
                            },
                            {
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name'
                            },
                            {
                                title: 'Price',
                                dataIndex: 'price',
                                key: 'price'
                            },
                            {
                                title: 'Qty.',
                                dataIndex: 'qty',
                                key: 'qty'
                            }
                        ]}
                        pagination={false}
                        scroll={{y: 'calc(100vh - 530px)'}}
                        rowClassName="editable-row"
                    />
                </div>
                <div className='bottom-container'>
                    <div className='basic-card total-price'>
                        <svg height="48px" viewBox="0 0 343 550" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="page-1" stroke="none" strokeWidth="1.2" fill="none" fillRule="evenodd">
                                <g id="6" transform="translate(-1677.000000, -467.000000)">
                                    <g id="group" transform="translate(1677.000000, 467.000000)">
                                        <path
                                            d="M301.258483,273.296055 C326.615333,255.370158 340.911494,231.241606 342.780386,202.973845 C345.094956,167.956788 329.003772,133.198277 299.731852,109.990643 C272.993647,88.7898229 239.417613,79.964766 207.535646,85.2514282 L207.535646,0 L155.827174,0 L155.827174,159.826113 L191.966472,144.155728 C197.617469,141.708154 203.182285,139.639781 208.51072,138.014631 C228.108231,132.036049 250.197598,136.707124 267.606117,150.508587 C283.80318,163.349734 292.396636,181.228846 291.18518,199.563493 C290.842919,204.739349 289.801363,220.495917 265.813557,234.686431 C252.039405,242.834342 243.812833,257.268629 243.812833,273.293593 C243.810371,289.318556 252.036942,303.755305 265.816019,311.905679 C289.801363,326.09373 290.842919,341.852761 291.18518,347.031079 C292.396636,365.363264 283.80318,383.239913 267.606117,396.081061 C250.20006,409.884986 228.108231,414.558523 208.51072,408.575017 C208.163535,408.469136 207.808963,408.346018 207.464239,408.237675 L207.464239,289.200364 L155.755767,289.200364 L155.755767,382.254974 C120.810689,358.557332 84.5704373,321.695976 58.0390665,273.296055 C70.4934213,250.575966 85.6538529,229.387457 103.217497,210.17129 L65.0517202,175.284737 C41.3027577,201.267438 21.3408251,230.369934 5.72240425,261.787038 L0,273.296055 L5.72486656,284.805072 C45.3975762,364.60486 105.165183,415.969449 155.755767,442.30919 L155.755767,550 L207.464239,550 L207.464239,461.306209 C213.528904,462.315772 219.650203,462.832865 225.778888,462.832865 C251.896591,462.832865 278.061078,453.783734 299.731852,436.601467 C329.003772,413.393832 345.094956,378.632859 342.780386,343.620727 C340.911494,315.348042 326.612871,291.219489 301.258483,273.296055"
                                            id="Fill-1" fill="#000000" mask="url(#mask-2)"/>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span>{totalCost()}.00</span>
                    </div>
                    <div className='checkout-btn' onClick={handleTender}>
                        Tender
                    </div>
                </div>
            </div>
            {showMask && <TransparentMask/>}
        </div>
    );
};

export default App;